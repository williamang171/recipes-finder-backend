from pydantic import BaseSettings


class Settings(BaseSettings):
    api_v1_str: str = "/api/v1"
    clarifai_app_id: str
    clarifai_user_id: str
    clarifai_key: str
    unsplash_client_id: str
    jwt_secret_key: str
    recaptcha_secret: str
    sqlalchemy_database_uri: str = "sqlite:///example.db"
    bypass_recaptcha: str = 'False'
    use_clarifai: str = 'False'

    class Config:
        env_file = ".env"


settings = Settings()
