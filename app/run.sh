#!/bin/sh
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-8000}

# run gunicorn
exec gunicorn --bind $HOST:$PORT -k uvicorn.workers.UvicornWorker app.main:app