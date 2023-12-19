
from fastapi import FastAPI, APIRouter,  Request
from pathlib import Path
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from app.api.api_v1.api import api_router
from fastapi.middleware.cors import CORSMiddleware
from .tags_metadata import tags_metadata
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.limiter import limiter

origins = [
    "https://recipes-finder-fe.netlify.app",
]

# auth.Base.metadata.create_all(bind=engine)
# recipe.Base.metadata.create_all(bind=engine)
app = FastAPI(title="Recipes Finder API", openapi_tags=tags_metadata,
              description='This documentation lists the available APIs for the app, you can sign in as a demo user with "demo@example.com:Password123!" by clicking on the "Authorize" button')
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Project Directories
ROOT = Path(__file__).resolve().parent.parent
BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))

root_router = APIRouter()


# @root_router.get("/", status_code=200)
# def root(
#     request: Request,
# ) -> dict:
#     """
#     Root GET
#     """
#     return {"message": "Hello World"}


app.mount("/static", StaticFiles(directory=BASE_PATH/"static"), name="static")

app.include_router(api_router, prefix="/api/v1")
app.include_router(root_router)

# @app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile):
#     return {"filename": file.filename}


@app.get("/{full_path:path}")
async def catch_all(request: Request, full_path: str):
    print("full_path: "+full_path)
    return TEMPLATES.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
