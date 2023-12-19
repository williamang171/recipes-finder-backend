from slowapi import Limiter 
from slowapi.util import get_remote_address
from app.api.deps import get_settings

settings = get_settings()
limiter = Limiter(key_func=get_remote_address, storage_uri=settings.REDIS_URL)