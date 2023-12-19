
from fastapi import Depends, APIRouter, Request
from app.limiter import limiter

api_router = APIRouter()

@api_router.get("/")
@limiter.limit("5/minute")
def hello_world( request: Request,):
    return {"msg": "Hello World"}


# @api_router.get("/wake-up", status_code=200)
# def search_recipes(
#     *,
#     db: Session = Depends(get_db)
# ) -> dict:
#     """
#     Search for recipes based on label keyword
#     """
#     crud_recipe.wake_up(db=db)
#     return {"results": []}
