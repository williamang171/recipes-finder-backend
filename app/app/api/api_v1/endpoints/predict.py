from fastapi import Depends, APIRouter, UploadFile
import os

from app.schemas.predict import PredictViaUrl, PredictResult
from app.api.deps import get_settings, get_redis
from app import config
from app.api.hugging_face_utils import query, query_via_url, validate_query_result
from app.api.redis_utils import cache_query_result, get_cached_query_result
 

sample_image_path = os.path.join(os.getcwd(), 'app', 'static', 'ramen.jpeg')
api_router = APIRouter()

# mock error response when model is not ready
# detail {
#    error: "Model william7642/my_awesome_food_model is currently loading"
#    estimated_time: 20
# }


@api_router.post("/", response_model=list[PredictResult])
async def predict_via_url(*, predict_via_url: PredictViaUrl, settings: config.Settings = Depends(get_settings), r = Depends(get_redis)):
    result = await query_via_url(data=predict_via_url.url, token=settings.HUGGINGFACE_TOKEN)
    return result

@api_router.post("/upload", response_model=list[PredictResult])
async def predict_via_upload(*, file: UploadFile, settings: config.Settings = Depends(get_settings)):
    file_bytes = await file.read()
    result = query(file_bytes, settings.HUGGINGFACE_TOKEN)
    validate_query_result(result)
    return result
