from fastapi import Depends, APIRouter
import httpx

from app.api.deps import get_settings
from app import config

api_router = APIRouter()


async def search_unsplash_photos(*, query: str, page: int, per_page: int, settings: config.Settings = Depends(get_settings)):
    # print(settings)
    async with httpx.AsyncClient() as client:
        response = await client.get(  # 4
            f"https://api.unsplash.com/search/photos?query={query}&page={page}&per_page={per_page}",
            headers={
                "Authorization": f"Client-ID {settings.UNSPLASH_CLIENT_ID}"},
        )
    return response.json()


@api_router.get("/search")
async def search_photos(*, query: str = "", page: int = 1, per_page: int = 20, settings: config.Settings = Depends(get_settings)):
    result = await search_unsplash_photos(query=query, page=page, per_page=per_page, settings=settings)
    return result
