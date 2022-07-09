from fastapi import Depends, FastAPI, APIRouter, HTTPException, Request, Query
from sqlalchemy.orm import Session
from pathlib import Path
from typing import Optional, Any
from fastapi.templating import Jinja2Templates

from . import crud, models, schemas
from .database import SessionLocal, engine
from .schemas import Recipe, RecipeCreate, RecipeSearchResults

from .recipe_data import RECIPES

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Recipe API")

# Project Directories
ROOT = Path(__file__).resolve().parent.parent
BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Updated to serve a Jinja2 template
# https://www.starlette.io/templates/
# https://jinja.palletsprojects.com/en/3.0.x/templates/#synopsis


api_router = APIRouter()


@api_router.get("/", status_code=200)
def root(
    request: Request,
) -> dict:
    """
    Root GET
    """
    return TEMPLATES.TemplateResponse(
        "index.html",
        {"request": request, "recipes": RECIPES},
    )


@api_router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@api_router.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@api_router.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@api_router.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)


@api_router.get("/items/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


@api_router.get("/recipes/", status_code=200, response_model=RecipeSearchResults)
def search_recipes(
    *,
    db: Session = Depends(get_db)
) -> dict:
    """
    Search for recipes based on label keyword
    """
    recipes = crud.get_recipes(db=db)
    return {"results": recipes}


@api_router.post("/recipes/", status_code=201, response_model=Recipe)
def create_recipe(
    *, recipe_in: RecipeCreate, db: Session = Depends(get_db)
) -> dict:
    """
    Create a new recipe in the database.
    """
    recipe = crud.create_recipe(db=db, obj_in=recipe_in)

    return recipe


@api_router.delete("/recipes/{recipe_id}", status_code=201)
def delete_recipe(*, recipe_id: int, db: Session = Depends(get_db)):
    """
    Remove a recipe in the database
    """
    recipe = crud.remove_recipe(db=db, id=recipe_id)
    return recipe


app.include_router(api_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
