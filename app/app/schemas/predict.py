from pydantic import BaseModel


class PredictViaUrl(BaseModel):
    url: str

    class Config:
        schema_extra = {
            "example": {
                "url": "https://images.unsplash.com/photo-1637361973734-5faf9b1e923e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }
        }


class PredictResult(BaseModel):
    score: float
    label: str

    class Config:
        schema_extra = {
            "example": {
                "name": "ramen",
                "score": 0.5968700647354126
            }
        }
