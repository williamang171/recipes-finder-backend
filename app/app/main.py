
from pathlib import Path

import secure
from app.api.api_v1.api import api_router
from app.limiter import limiter
from fastapi import APIRouter, Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from .api.deps import validate_token
from .tags_metadata import tags_metadata

origins = [
    "https://recipes-finder-fe.netlify.app",
]
csp = secure.ContentSecurityPolicy().default_src("'self'").frame_ancestors("'none'")
hsts = secure.StrictTransportSecurity().max_age(31536000).include_subdomains()
referrer = secure.ReferrerPolicy().no_referrer()
cache_value = secure.CacheControl().no_cache().no_store().max_age(0).must_revalidate()
x_frame_options = secure.XFrameOptions().deny()

secure_headers = secure.Secure(
    csp=csp,
    hsts=hsts,
    referrer=referrer,
    cache=cache_value,
    xfo=x_frame_options,
)

# auth.Base.metadata.create_all(bind=engine)
# recipe.Base.metadata.create_all(bind=engine)
app = FastAPI(title="Recipes Finder API", openapi_tags=tags_metadata,
              description='This documentation lists the available APIs for the app')
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.framework.fastapi(response)
    return response

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
@app.get("/api/messages/public")
def public():
    return {"text": "This is a public message."}

@app.get("/api/messages/protected", dependencies=[Depends(validate_token)])
def protected():
    return {"text": "This is a protected message."}

@app.get("/{full_path:path}")
async def catch_all(request: Request, full_path: str):
    print("full_path: "+full_path)
    return TEMPLATES.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
