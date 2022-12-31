from fastapi import Depends, APIRouter, UploadFile, HTTPException
import os

from app.schemas.predict import PredictViaUrl, PredictResult
from app.api.deps import get_settings
from app import config
from app.api.deps import get_current_user
from app.api.clarifai import predict_with_clarifai
from app.api.hugging_face_utils import query
from app.schemas.auth import User

sample_image_path = os.path.join(os.getcwd(), 'app', 'static', 'ramen.jpeg')
api_router = APIRouter()

# mock error response when model is not ready
# detail {
#    error: "Model william7642/my_awesome_food_model is currently loading"
#    estimated_time: 20
# }


def validate_query_result(result):
    # Raise mock for testing
    # raise HTTPException(status_code=503, detail={
    #                     'error': "Model is currently loading", "estimated_time": 20})
    if ('error' in result):
        raise HTTPException(status_code=503, detail=result)
    return


@api_router.post("/", response_model=list[PredictResult])
def predict_via_url(*, predict_via_url: PredictViaUrl, settings: config.Settings = Depends(get_settings), current_user: User = Depends(get_current_user)):
    if (settings.USE_CLARIFAI == 'True'):
        return predict_with_clarifai(settings=settings, image_url=predict_via_url.url)
    result = query(predict_via_url.url, settings.HUGGINGFACE_TOKEN)
    validate_query_result(result)
    return result


@api_router.post("/upload", response_model=list[PredictResult])
async def predict_via_upload(*, file: UploadFile, settings: config.Settings = Depends(get_settings), current_user: User = Depends(get_current_user)):
    if (settings.USE_CLARIFAI == 'True'):
        file_bytes = await file.read()
        return predict_with_clarifai(settings=settings, file_bytes=file_bytes)
    file_bytes = await file.read()
    result = query(file_bytes, settings.HUGGINGFACE_TOKEN)
    validate_query_result(result)
    return result
