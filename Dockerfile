# Dockerfile

# pull the official docker image
FROM python:3.9

# create the app user
RUN addgroup --system app && adduser --system --group app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV ENVIRONMENT prod
ENV TESTING 0

# install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app/

# copy project
# COPY ./app/alembic/ /app/alembic
COPY ./app/app/ /app/app
# COPY ./app/alembic.ini /app/alembic.ini
COPY ./app/run.sh /app/run.sh

RUN chmod +x /app/run.sh
RUN chown -R app:app $HOME
ENV PYTHONPATH=/

USER app
CMD ["/app/run.sh"]
