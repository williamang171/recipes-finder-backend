from functools import lru_cache
import redis
from .authorization_header_elements import get_bearer_token
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from .json_web_token import JsonWebToken
from passlib.context import CryptContext
from app import config

@lru_cache()
def get_settings():
    return config.Settings()

# to get a string like this run:
# openssl rand -hex 32
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/token")

def get_redis(*, settings: config.Settings = Depends(get_settings)):
    r = redis.Redis(
    host=settings.REDIS_HOST,
    port=int(settings.REDIS_PORT),
    password=settings.REDIS_PW)
    return r

def validate_token(token: str = Depends(get_bearer_token)):
    return JsonWebToken(token).validate()
