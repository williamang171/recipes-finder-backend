from pydantic import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    UNSPLASH_CLIENT_ID: str = ''
    JWT_SECRET_KEY: str = '' 
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///example.db"
    HUGGINGFACE_TOKEN: str = ''
    REDIS_HOST: str = ''
    REDIS_PW: str = ''
    REDIS_PORT: str = ''
    REDIS_URL: str = ''
    SPOONACULAR_API_KEY: str = ''

    class Config:
        env_file = ".env"


settings = Settings()
