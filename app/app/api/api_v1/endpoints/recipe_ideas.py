import asyncio

import httpx
from app.api.deps import get_redis, get_settings
from app.api.redis_utils import cache_query_result, get_cached_query_result
from app.limiter import limiter
from fastapi import APIRouter, Depends, Request

from app import config

MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1"
SPOONACULAR_BASE_URL = "https://api.spoonacular.com"
RECIPE_SUBREDDITS = ["recipes", "easyrecipes",
                     "TopSecretRecipes"]
api_router = APIRouter()

# ---------- themealdb ----------
async def get_mealdb(q: str) -> list:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{MEALDB_BASE_URL}/search.php?s={q}",
            )
        mealdb_meals = response.json()
        mealdb_meals_data = []
        if (mealdb_meals["meals"] is None):
            return []
        for entry in mealdb_meals["meals"]:
            mealdb_id = entry["idMeal"]
            name = entry["strMeal"]
            image_url = entry["strMealThumb"]
            url = f"https://themealdb.com/meal.php?c={mealdb_id}"
            mealdb_meals_data.append({
                "image_url": image_url,
                "title": name,
                "source_type": "themealdb",
                "url": url,
                "mealdb_id": mealdb_id
            })
        return mealdb_meals_data
    except Exception as e:
        print(e)
        return []

@api_router.get('/mealdb')
async def fetch_ideas_mealdb(
    *,
    q: str
) -> list:
    results = await get_mealdb(q)
    return results

# ---------- reddit ----------
def get_reddit_suitable_image(entry):
    try:
        image_url = entry["data"]["url"]
        if (entry["data"]["thumbnail"]):
            image_url = entry["data"]["thumbnail"]
        return None if image_url == "self" or image_url == "default" else image_url
    except Exception as e:
        print(e)
        return None


async def get_reddit_top_async(subreddit: str, q: str) -> list:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://www.reddit.com/r/{subreddit}/search.json?sort=top&t=all&limit=5&q={q}&restrict_sr=true",
                headers={"User-agent": "recipe bot 0.1"},
            )

        subreddit_recipes = response.json()
        subreddit_data = []
        for entry in subreddit_recipes["data"]["children"]:
            score = entry["data"]["score"]
            title = entry["data"]["title"]
            permalink = entry["data"]["permalink"]
            id = entry["data"]["id"]
            subreddit_name_prefixed = entry["data"]["subreddit_name_prefixed"]
            postLink = f"https://www.reddit.com/{permalink}"
            subreddit_data.append({
                "image_url": get_reddit_suitable_image(entry),
                "title": title,
                "score": score,
                "permalink": permalink,
                "url": postLink,
                "reddit_post_id": id,
                "source_type": "reddit",
                "subreddit_name_prefixed": subreddit_name_prefixed
            })
            # subreddit_data.append(entry["data"])
        return subreddit_data
    except Exception as e:
        print(e)
        return []

# @api_router.get("/reddit")
# def fetch_ideas_reddit(*, reddit_client: RedditClient = Depends(get_reddit_client)) -> dict:
#     return {
#         key: reddit_client.get_reddit_top(subreddit=key) for key in RECIPE_SUBREDDITS
#     }

# ---------- spoonacular ----------
async def get_spoonacular_search(q: str, apiKey: str) -> list:
    try:
        number = 4
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{SPOONACULAR_BASE_URL}/recipes/complexSearch?query={q}&apiKey={apiKey}&number={str(number)}",
            )
        recipes_res = response.json()
        res = []
        if (recipes_res["results"] is None):
            return []
        for entry in recipes_res["results"]:
            source_id = entry["id"]
            name = entry["title"]
            image_url = entry["image"]
            res.append({
                "image_url": image_url,
                "title": name,
                "source_type": "spoonacular", 
                "source_id": source_id
            })
        return res
    except Exception as e:
        print(e)
        return []

async def get_spoonacular_recipe_info(ids: list, apiKey: str) -> list:
    if not ids or len(ids) == 0:
        return []
    try:
        ids_str = ','.join(ids)
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{SPOONACULAR_BASE_URL}/recipes/informationBulk?ids={ids_str}&apiKey={apiKey}",
            )
        recipes_res = response.json()
        res = []
        if (recipes_res is None):
            return []
        for entry in recipes_res:
            source_id = entry["id"]
            url = entry["spoonacularSourceUrl"]
            res.append({
                "source_type": "spoonacular", 
                "source_id": source_id,
                "url": url
            })
        return res
    except Exception as e:
        print(e)
        return []

def get_result_ids(results: list) -> list:
    if not results or len(results) == 0:
        return []
    ids = []
    for entry in results:
        if "source_id" in entry:
            ids.append(str(entry["source_id"]))
    return ids

async def get_spoonacular_result(q: str, settings: config.Settings = Depends(get_settings)):
    apiKey = settings.SPOONACULAR_API_KEY
    list1 = await get_spoonacular_search(q, apiKey)
    list2 = await get_spoonacular_recipe_info(get_result_ids(list1), apiKey)
    merged_list = {d['source_id']: {**d1, **d} for d in list1 for d1 in list2 if d['source_id'] == d1['source_id']}
    # Convert the dictionary values back to a list
    result_list = list(merged_list.values())
    return result_list

@api_router.get('/spoonacular')
@limiter.limit("10/minute")
async def fetch_ideas_spoonacular(*,
                                  request: Request,
                                  q: str, 
                                  settings: config.Settings = Depends(get_settings),
                                  r = Depends(get_redis)) -> list:
    prefix_key = 'recipe_ideas_spoonacular'
    cached_result = get_cached_query_result(r, q, prefix_key=prefix_key)
    if (cached_result):
        print(f'Cache found for {prefix_key}:{q}, using cached result')
        return cached_result
    result = await get_spoonacular_result(q, settings=settings)
    cache_duration = 60 * 50 # 50 minutes
    cache_query_result(r, q, result, prefix_key=prefix_key, ttl_seconds=cache_duration)
    return result

# ---------- aggregator ----------
@api_router.get("/aggregate")
@limiter.limit("10/minute")
async def fetch_ideas_aggregate(
    *,
    request: Request,
    q: str, 
    settings: config.Settings = Depends(get_settings),
    r = Depends(get_redis)
) -> list:
    prefix_key = 'recipe_ideas'
    cached_result = get_cached_query_result(r, q, prefix_key=prefix_key)
    if (cached_result):
        print(f'Cache found for {prefix_key}:{q}, using cached result')
        return cached_result
    results = await asyncio.gather(
        get_mealdb(q=q),
        get_spoonacular_result(q=q, settings=settings),
        # *[get_reddit_top_async(subreddit=subreddit, q=q)
        #   for subreddit in RECIPE_SUBREDDITS],
    )
    to_return = []
    for result in results:
        to_return.extend(result)
    cache_duration = 60 * 50 # 50 minutes
    cache_query_result(r, q, to_return, prefix_key=prefix_key, ttl_seconds=cache_duration)
    # final_results = [*results[0], *results[1], *results[2]]
    # return dict(zip(RECIPE_SUBREDDITS, results))
    return to_return






