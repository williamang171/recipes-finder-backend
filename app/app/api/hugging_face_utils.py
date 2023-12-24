from fastapi import Request, HTTPException
import requests
import json
from fastapi_cache.decorator import cache
# classifier = pipeline("image-classification",
#                       model="william7642/my_awesome_food_model")

API_URL = "https://api-inference.huggingface.co/models/william7642/my_awesome_food_model"

def validate_query_result(result):
    # Raise mock for testing
    # raise HTTPException(status_code=503, detail={
    #                     'error': "Model is currently loading", "estimated_time": 20})
    if ('error' in result):
        raise HTTPException(status_code=503, detail=result)
    return

def request_key_builder(
    func,
    namespace: str = "",
    *,
    request: Request,
    **kwargs,
):
    args = kwargs.get('kwargs', {})
    q = args.get('data')
    return ":".join([
        namespace,
        q
    ])

@cache(namespace='predict_via_url', key_builder=request_key_builder)
def query_via_url(data, token=''):
    res = query(data, token)
    validate_query_result(res)
    return res

def query(data, token=''):
    # Model is public, thus we can omit the token
    headers = {"Authorization": f"Bearer {token}"}
    if not token:
        headers = {}
    response = requests.request(
        "POST", API_URL, headers=headers if token is not None else None, data=data)
    return json.loads(response.content.decode("utf-8"))
