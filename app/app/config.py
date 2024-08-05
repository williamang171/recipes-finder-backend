from pydantic.v1 import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY: str = ''
    REDIS_HOST: str = ''
    REDIS_PW: str = ''
    REDIS_PORT: str = ''
    REDIS_URL: str = ''
    SPOONACULAR_API_KEY: str = ''
    AUTH0_DOMAIN: str = ''
    AUTH0_AUDIENCE: str = ''
    # Following are optional variables
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///example.db"
    UNSPLASH_CLIENT_ID: str = ''
    HUGGINGFACE_TOKEN: str = ''

    class Config:
        env_file = ".env"


settings = Settings()
