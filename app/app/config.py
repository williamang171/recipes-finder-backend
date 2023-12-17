from pydantic import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    UNSPLASH_CLIENT_ID: str = ''
    JWT_SECRET_KEY: str = ''
    # RECAPTCHA_SECRET: str = ''
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///example.db"
    # BYPASS_RECAPTCHA: str = 'True'
    HUGGINGFACE_TOKEN: str = ''
    REDIS_HOST: str = ''
    REDIS_PW: str = ''
    REDIS_PORT: str = ''

    class Config:
        env_file = ".env"


settings = Settings()
