
from clarifai_grpc.grpc.api.status import status_code_pb2
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from fastapi import Depends, APIRouter, HTTPException, UploadFile
import httpx

from app.schemas.predict import PredictViaUrl
from app.api.deps import get_settings
from app import config
from app.api.deps import verify_recaptcha

api_router = APIRouter()

channel = ClarifaiChannel.get_grpc_channel()
stub = service_pb2_grpc.V2Stub(channel)


def predict(*, settings: config.Settings, image_url: str = None, file_bytes: bytes = None):
    MODEL_ID = "bd367be194cf45149e75f01d59f77ba7"

    if (image_url is not None):
        image = resources_pb2.Image(
            url=image_url
        )
    if (file_bytes is not None):
        image = resources_pb2.Image(
            base64=file_bytes
        )

    metadata = (('authorization', f'Key {settings.clarifai_key}'),)
    userDataObject = resources_pb2.UserAppIDSet(
        user_id=settings.clarifai_user_id, app_id=settings.clarifai_app_id)

    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            # The userDataObject is created in the overview and is required when using a PAT
            user_app_id=userDataObject,
            model_id=MODEL_ID,
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        image=image
                    )
                )
            ]
        ),
        metadata=metadata
    )

    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception("Post model outputs failed, status: " +
                        post_model_outputs_response.status.description)

    # Since we have one input, one output will exist here
    output = post_model_outputs_response.outputs[0]
    toReturn = []

    # print("Predicted concepts:")
    for concept in output.data.concepts:
        d = {"name": concept.name, "value": concept.value}
        toReturn.append(d)
        # print("%s %.2f" % (concept.name, concept.value))

    return toReturn


@api_router.post("/")
def predict_via_url(*, predict_via_url: PredictViaUrl, settings: config.Settings = Depends(get_settings), valid_recaptcha: bool = Depends(verify_recaptcha)):
    return predict(settings=settings, image_url=predict_via_url.url)


@api_router.post("/upload")
async def predict_via_upload(*, file: UploadFile, settings: config.Settings = Depends(get_settings), valid_recaptcha: bool = Depends(verify_recaptcha)):
    file_bytes = await file.read()
    return predict(settings=settings, file_bytes=file_bytes)
