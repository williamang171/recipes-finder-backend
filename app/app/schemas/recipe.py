from pydantic import BaseModel, HttpUrl

from typing import Sequence


class Recipe(BaseModel):
    id: int
    name: str
    userId: int
    imageUrl: HttpUrl
    url: HttpUrl
    mealDbId: str


class RecipeCreate(BaseModel):
    name: str
    imageUrl: HttpUrl
    url: HttpUrl
    mealDbId: str


class RecipeBase(BaseModel):
    name: str
    image_url: HttpUrl
    url: HttpUrl
    mealdb_id: str


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
