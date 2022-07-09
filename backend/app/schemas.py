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


# From tutorial
class ItemBase(BaseModel):
    title: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []

    class Config:
        orm_mode = True


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
