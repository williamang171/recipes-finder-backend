from transformers import AutoFeatureExtractor, AutoModelForImageClassification
import torch

extractor = AutoFeatureExtractor.from_pretrained(
    "william7642/my_awesome_food_model")
model = AutoModelForImageClassification.from_pretrained(
    "william7642/my_awesome_food_model")


def predict_with_transformer(image):
    inputs = extractor(image, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
    predicted_label = logits.argmax(-1).item()
    return model.config.id2label[predicted_label]
