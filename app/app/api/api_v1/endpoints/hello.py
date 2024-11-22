
from fastapi import Depends, APIRouter, Request
from app.limiter import limiter

api_router = APIRouter()

@api_router.get("/")
@limiter.limit("5/minute")
def hello_world( request: Request,):
    return {"msg": "Hello World"}

