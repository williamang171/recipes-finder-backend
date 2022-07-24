from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_hello():
    response = client.get("/api/v1/hello/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World Updated"}
