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

WORKDIR /backend/

# copy project
COPY ./backend/alembic/ /backend/alembic
COPY ./backend/app/ /backend/app
COPY ./backend/alembic.ini /backend/alembic.ini
COPY ./backend/run.sh /backend/run.sh

RUN chmod +x /backend/run.sh
RUN chown -R app:app $HOME
ENV PYTHONPATH=/

USER app
CMD ["/backend/run.sh"]
