from fastapi import Depends, APIRouter, UploadFile
import os

from app.schemas.predict import PredictViaUrl, PredictResult
from app.api.deps import get_settings
from app import config
from app.api.deps import verify_recaptcha
from app.api.clarifai import predict_with_clarifai
from app.api.hugging_face_utils import query

sample_image_path = os.path.join(os.getcwd(), 'app', 'static', 'ramen.jpeg')
api_router = APIRouter()


@api_router.post("/", response_model=list[PredictResult])
def predict_via_url(*, predict_via_url: PredictViaUrl, settings: config.Settings = Depends(get_settings)):
    if (settings.USE_CLARIFAI == 'True'):
        return predict_with_clarifai(settings=settings, image_url=predict_via_url.url)
    result = query(predict_via_url.url, settings.HUGGINGFACE_TOKEN)
    return result


@api_router.post("/upload", response_model=list[PredictResult])
async def predict_via_upload(*, file: UploadFile, settings: config.Settings = Depends(get_settings)):
    if (settings.USE_CLARIFAI == 'True'):
        file_bytes = await file.read()
        return predict_with_clarifai(settings=settings, file_bytes=file_bytes)
    file_bytes = await file.read()
    result = query(file_bytes, settings.HUGGINGFACE_TOKEN)
    return result
