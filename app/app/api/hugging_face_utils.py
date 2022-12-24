import requests
import json
from transformers import pipeline

classifier = pipeline("image-classification",
                      model="william7642/my_awesome_food_model")

API_URL = "https://api-inference.huggingface.co/models/william7642/my_awesome_food_model"


def query(data, token=''):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.request("POST", API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))
