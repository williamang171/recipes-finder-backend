from fastapi import Depends, APIRouter, status, Response
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.crud import crud_recipe
from app.schemas.recipe import Recipe, RecipeCreate, RecipeSearchResults
from app.schemas.auth import User

api_router = APIRouter()


@api_router.get("/", status_code=200, response_model=RecipeSearchResults)
def search_recipes(
    *,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> dict:
    """
    Search for recipes based on label keyword
    """
    recipes = crud_recipe.get_recipes(db=db, user_id=current_user.id)
    return {"results": recipes}


@api_router.post("/", status_code=201, response_model=Recipe)
def create_recipe(
    *, recipe_in: RecipeCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
) -> dict:
    """
    Create a new recipe in the database.
    """
    recipe = crud_recipe.create_recipe(
        db=db, obj_in=recipe_in, user_id=current_user.id)
    return recipe


@api_router.delete("/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
def delete_recipe(*, recipe_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Remove a recipe in the database
    """
    crud_recipe.remove_recipe(db=db, id=recipe_id, user_id=current_user.id)
    return None
