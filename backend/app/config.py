from pydantic import BaseSettings


class Settings(BaseSettings):
    api_v1_str: str = "/api/v1"
    clarifai_app_id: str
    clarifai_user_id: str
    clarifai_key: str
    unsplash_client_id: str
    jwt_secret_key: str
    recaptcha_secret: str

    class Config:
        env_file = ".env"
