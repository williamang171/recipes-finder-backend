
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud import crud_recipe

api_router = APIRouter()


@api_router.get("/")
def hello_world():
    return {"msg": "Hello World"}


@api_router.get("/wake-up", status_code=200)
def search_recipes(
    *,
    db: Session = Depends(get_db)
) -> dict:
    """
    Search for recipes based on label keyword
    """
    crud_recipe.wake_up(db=db)
    return {"results": []}
