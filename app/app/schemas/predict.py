from pydantic import BaseModel


class PredictViaUrl(BaseModel):
    url: str
