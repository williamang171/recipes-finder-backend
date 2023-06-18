# Recipes Finder

Find recipes by providing text based queries, image url, or uploading image 



https://github.com/williamang171/recipes-finder-backend/assets/70843788/66809163-c6ae-4a33-8c77-bda773d3d67e



## Front End Repository
https://github.com/williamang171/recipes-finder-frontend

<br >

## Running the App

OS X & Linux:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd app
uvicorn app.main:app --reload
```

Windows:
```sh
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd app
uvicorn app.main:app --reload
```

The app should be running on [localhost:8000](localhost:8000), while the 
API documentation will be available on [localhost:8000/docs](localhost:8000/docs)

Currently the app is likely to return errors, as we have not added the necessary environment variables and setup Postgres locally

### Environment Variables
| Environment Variable    	| Description                                                                                                                                                                                                          	|
|-------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| JWT_SECRET_KEY          	| You can generate a value for this with `openssl rand -base64 64`, if you using Windows, you can use Git Bash to run the command                                                                                 	|
| SQLALCHEMY_DATABASE_URI 	| When running the database with docker locally (we will cover this later), use `postgresql://postgres:postgres@localhost:5432/db`, you will need to change this variable when deploying to a production database URI. 	|
| UNSPLASH_CLIENT_ID        | Optional variable, used internally to test out different unsplash images during development |

<br />

### Running Postgres and PgAdmin
> We will be using [Docker](https://docs.docker.com/get-docker/) to run Postgres and PgAdmin

```sh
docker-compose up
```

Postgres should be available on port 5432, you can open PgAdmin via localhost:5050 and login with admin@admin.com / root.
<br />
<br />
You can then connect to the postgres database with the credentials provided in the `docker-compose.yml` file (note that the host needs to be postgres instead of localhost)

<br />

### Applying database migrations
Open another command tab / window, and activate the virtual environment, cd into the `/app` folder, then run the following commands

1. Verify migrations to be applied

```sh
alembic history
```

2. Apply migrations

```sh
alembic upgrade head
``` 

3. Verify if migrations have been applied

```sh
alembic history
```

<br />

## Optional: Using docker-compose to run the app
The installation section earlier describes how to run the backend app locally without docker, and connecting to a postgres instance created via Docker. However if you would like to run the backend app with docker as well, you can follow the steps below.

First of all update the environment variable `SQLALCHEMY_DATABASE_URI` to `postgresql://postgres:postgres@postgres:5432/db`

If you are using a Mac with M1 chip, run the following command first.
```sh
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

Run the following command to build the docker containers

```sh
docker-compose -f docker-compose-all.yml build
```

Then run the following command to run the containers

```sh
docker-compose -f docker-compose-all.yml up
```

The application should be available on localhost:8000

Then run the following command to apply database migrations, you can use `docker ps` to identify the `<backend_container_name>`
```sh
docker exec -it <backend_container_name> bash
alembic upgrade head
```

Verify if migrations have been applied

```sh
alembic history
```

## Appendix

### Backend
- [FastAPI Official Documentation](https://fastapi.tiangolo.com/)
- [The FastAPI Ultimate Tutorial](https://christophergs.com/python/2021/12/04/fastapi-ultimate-tutorial/)
- [FastAPI with Alembic](https://testdriven.io/blog/fastapi-sqlmodel/#alembic)

### Frontend
- [React with TypeScript](https://www.youtube.com/watch?v=ydkQlJhodio)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)

### Machine Learning with Hugging Face
- [Training Image Classification Model with Hugging Face](https://huggingface.co/docs/transformers/tasks/image_classification)
- [Hosting Machine Learning Model Demos with Gradio](https://huggingface.co/course/chapter9/1)

### Others
- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Clarifai API Documentation (Used in the older version of the app)](https://docs.clarifai.com/api-guide/predict/images)

## License
Distributed under the MIT license. See ``LICENSE`` for more information.
