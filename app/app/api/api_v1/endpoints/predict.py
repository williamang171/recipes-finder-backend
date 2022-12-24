from fastapi import Depends, APIRouter, UploadFile
import os

from app.schemas.predict import PredictViaUrl
from app.api.deps import get_settings
from app import config
from app.api.deps import verify_recaptcha
from app.api.clarifai import predict_with_clarifai
from app.api.hugging_face_utils import query

sample_image_path = os.path.join(os.getcwd(), 'app', 'static', 'ramen.jpeg')
api_router = APIRouter()


@api_router.post("/")
def predict_via_url(*, predict_via_url: PredictViaUrl, settings: config.Settings = Depends(get_settings), valid_recaptcha: bool = Depends(verify_recaptcha)):
    if (settings.use_clarifai == 'True'):
        return predict_with_clarifai(settings=settings, image_url=predict_via_url.url)
    result = query(predict_via_url.url, settings.huggingface_token)
    return result


@api_router.post("/upload")
async def predict_via_upload(*, file: UploadFile, settings: config.Settings = Depends(get_settings), valid_recaptcha: bool = Depends(verify_recaptcha)):
    if (settings.use_clarifai == 'true'):
        file_bytes = await file.read()
        return predict_with_clarifai(settings=settings, file_bytes=file_bytes)
    file_bytes = await file.read()
    result = query(file_bytes, settings.huggingface_token)
    return result
