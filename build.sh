#!/bin/sh
if [ ! -f .env ]
then
  export $(cat ./app/.env | xargs)
fi

gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/$GCP_CONTAINER_NAME