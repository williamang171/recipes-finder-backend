from fastapi import APIRouter

from app.api.api_v1.endpoints import recipe, auth, predict, unsplash


api_router = APIRouter()
api_router.include_router(
    recipe.api_router, prefix="/recipes", tags=["recipes"])
api_router.include_router(auth.api_router, prefix="/auth", tags=["auth"])
api_router.include_router(
    predict.api_router, prefix="/predict", tags=["predict"])
api_router.include_router(
    unsplash.api_router, prefix="/unsplash", tags=["unsplash"])
