from fastapi import Depends, APIRouter, UploadFile
from PIL import Image
import os
import io
import requests

from app.schemas.predict import PredictViaUrl
from app.api.deps import get_settings
from app import config
from app.api.deps import verify_recaptcha
from app.api.clarifai import predict_with_clarifai
from app.api.hugging_face_utils import predict_with_transformer

image_path = os.path.join(os.getcwd(), 'app', 'static', 'ramen.jpeg')
api_router = APIRouter()


@api_router.post("/")
def predict_via_url(*, predict_via_url: PredictViaUrl, settings: config.Settings = Depends(get_settings), valid_recaptcha: bool = Depends(verify_recaptcha)):
    if (settings.use_clarifai == 'True'):
        return predict_with_clarifai(settings=settings, image_url=predict_via_url.url)
    image = Image.open(requests.get(predict_via_url.url, stream=True).raw)
    result = predict_with_transformer(image)
    return result


@api_router.post("/upload")
async def predict_via_upload(*, file: UploadFile, settings: config.Settings = Depends(get_settings), valid_recaptcha: bool = Depends(verify_recaptcha)):
    if (settings.use_clarifai == 'true'):
        file_bytes = await file.read()
        return predict_with_clarifai(settings=settings, file_bytes=file_bytes)

    file_bytes = await file.read()
    image = Image.open(io.BytesIO(file_bytes))
    result = predict_with_transformer(image)
    return result
