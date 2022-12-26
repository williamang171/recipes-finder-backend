from pydantic import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    CLARIFAI_APP_ID: str = ''
    CLARIFAI_USER_ID: str = ''
    CLARIFAI_KEY: str = ''
    UNSPLASH_CLIENT_ID: str = ''
    JWT_SECRET_KEY: str
    RECAPTCHA_SECRET: str = ''
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///example.db"
    BYPASS_RECAPTCHA: str = 'True'
    USE_CLARIFAI: str = 'False'
    HUGGINGFACE_TOKEN: str

    class Config:
        env_file = ".env"


settings = Settings()
