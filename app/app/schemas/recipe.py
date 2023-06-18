from pydantic import BaseModel, HttpUrl
from enum import Enum
from typing import Sequence, Optional


class RecipeSourceType(str, Enum):
    reddit = 'reddit'
    mealdb = 'mealdb'


class RecipeBase(BaseModel):
    image_url: Optional[HttpUrl]
    url: HttpUrl
    mealdb_id: Optional[str]
    reddit_post_id: Optional[str]
    source_type: Optional[RecipeSourceType]
    title: str
    subreddit_name_prefixed: Optional[str]


class RecipeCreate(RecipeBase):
    pass

# Properties shared by models stored in DB


class RecipeInDBBase(RecipeBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# Properties to return to client


class Recipe(RecipeInDBBase):
    pass


class RecipeSearchResults(BaseModel):
    results: Sequence[Recipe]
