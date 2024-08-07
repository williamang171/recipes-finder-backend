from functools import lru_cache
import redis
from app.clients.reddit import RedditClient
# from app.database import SessionLocal
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


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# async def get_current_user(db: Session = Depends(get_db),  token: str = Depends(oauth2_scheme), settings: config.Settings = Depends(get_settings)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, settings.JWT_SECRET_KEY,
#                              algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = crud_auth.get_user_by_email_normalized(
#         db, email=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user


# async def verify_recaptcha(*, recaptcha_res: Union[str, None] = Header(default=None), settings: config.Settings = Depends(get_settings)):
#     if (settings.BYPASS_RECAPTCHA == 'True'):
#         return True
#     async with httpx.AsyncClient() as client:
#         response = await client.post(  # 4
#             f"https://www.google.com/recaptcha/api/siteverify",
#             data={
#                 'secret': settings.RECAPTCHA_SECRET,
#                 'response': recaptcha_res
#             }
#         )
#     result = response.json()
#     if (result['success']):
#         return True
#     raise HTTPException(400, detail="Bad Request")


def get_reddit_client() -> RedditClient:
    return RedditClient()


def get_redis(*, settings: config.Settings = Depends(get_settings)):
    r = redis.Redis(
    host=settings.REDIS_HOST,
    port=int(settings.REDIS_PORT),
    password=settings.REDIS_PW)
    return r

def validate_token(token: str = Depends(get_bearer_token)):
    return JsonWebToken(token).validate()
