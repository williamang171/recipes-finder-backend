from pydantic import BaseModel


class UnsplashSearch(BaseModel):
    query: str
    page: int
    per_page: int
