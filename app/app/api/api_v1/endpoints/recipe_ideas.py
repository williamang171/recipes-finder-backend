from fastapi import Depends, APIRouter
import httpx
import asyncio
from app.api.deps import get_current_user, get_db, get_reddit_client
from app.clients.reddit import RedditClient

from app.schemas.auth import User

MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1"
RECIPE_SUBREDDITS = ["recipes", "easyrecipes",
                     "TopSecretRecipes"]
# RECIPE_SUBREDDITS = ["recipes"]
api_router = APIRouter()


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


def get_suitable_image_url(entry):
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
                "image_url": get_suitable_image_url(entry),
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


@api_router.get("/async")
async def fetch_ideas_async(
    q: str
) -> list:
    results = await asyncio.gather(
        fetch_ideas_mealdb_async(q=q),
        *[get_reddit_top_async(subreddit=subreddit, q=q)
          for subreddit in RECIPE_SUBREDDITS],
    )
    to_return = []
    for result in results:
        to_return.extend(result)
    # final_results = [*results[0], *results[1], *results[2]]
    # return dict(zip(RECIPE_SUBREDDITS, results))
    return to_return

@api_router.get("/reddit_ideas")
def fetch_ideas(reddit_client: RedditClient = Depends(get_reddit_client)) -> dict:
    return {
        key: reddit_client.get_reddit_top(subreddit=key) for key in RECIPE_SUBREDDITS
    }


@api_router.get('/mealdb')
async def fetch_ideas_mealdb_async(
    q: str
) -> list:
    results = await get_mealdb(q)
    return results
