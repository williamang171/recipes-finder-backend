from fastapi import APIRouter, Depends

from app.api.api_v1.endpoints import predict, hello, recipe_ideas
from app.api.deps import validate_token

api_router = APIRouter()
api_router.include_router(
    predict.api_router, prefix="/predict", tags=["predict"],  dependencies=[Depends(validate_token)])
api_router.include_router(
    hello.api_router, prefix='/hello', tags=["hello"]
)
api_router.include_router(
    recipe_ideas.api_router, prefix='/recipe_ideas', tags=["recipe-ideas"],
    dependencies=[Depends(validate_token)]
)
# api_router.include_router(
#     recipe.api_router, prefix="/recipes", tags=["recipes"])
# api_router.include_router(auth.api_router, prefix="/auth", tags=["auth"])
# api_router.include_router(
#     unsplash.api_router, prefix="/unsplash", tags=["unsplash"])