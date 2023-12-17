from fastapi import Depends, APIRouter, UploadFile, HTTPException
import os

from app.schemas.predict import PredictViaUrl, PredictResult
from app.api.deps import get_settings, get_redis
from app import config
from app.api.deps import get_current_user
from app.api.hugging_face_utils import query
from app.schemas.auth import User
import json

 

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

def get_cached_query_result(r, url):
    result = r.get(url)
    if not result:
        return None
    unpacked_result = json.loads(result)
    return unpacked_result

def cache_query_result(r, url, result):
    if ('error' in result):
        return
    result_json = json.dumps(result)
    r.set(url, result_json)

@api_router.post("/", response_model=list[PredictResult])
def predict_via_url(*, predict_via_url: PredictViaUrl, settings: config.Settings = Depends(get_settings), current_user: User = Depends(get_current_user), r = Depends(get_redis)):
    cached_result = get_cached_query_result(r, predict_via_url.url)
    if (cached_result):
        print("Cache found for the given url, using cached result")
        return cached_result
    print("Cache not found for the given url, predicting...")
    result = query(predict_via_url.url, settings.HUGGINGFACE_TOKEN)
    validate_query_result(result)
    cache_query_result(r, predict_via_url.url, result)
    print("Saved result to cache")
    return result


@api_router.post("/upload", response_model=list[PredictResult])
async def predict_via_upload(*, file: UploadFile, settings: config.Settings = Depends(get_settings), current_user: User = Depends(get_current_user)):
    file_bytes = await file.read()
    result = query(file_bytes, settings.HUGGINGFACE_TOKEN)
    validate_query_result(result)
    return result
