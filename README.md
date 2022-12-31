# Recipes Finder

Find recipes by providing image url, uploading image, or providing text based queries

https://user-images.githubusercontent.com/70843788/210121468-189ebaf9-a4d0-465d-989e-ca7e2d00feba.mp4

## Live Demo
[Demo](https://recipes-finder-fe.netlify.app/auth/sign-in)

[API Doc](https://rf-backend-h62gfkc3pq-uc.a.run.app/docs)

## Front End Repository
https://github.com/williamang171/recipes-finder-frontend

<br >

## Installation

### Running the App

OS X & Linux:

```sh
python3 -m venv venv
source venv/bin/activate
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

The app should be running on [localhost:8000](localhost:8000), 
you can visit [localhost:8000/docs](localhost:8000/docs) for the API documentation

<br />

### Environment Variables
| Environment Variable    	| Description                                                                                                                                                                                                                 	|
|-------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| JWT_SECRET_KEY          	| You can generate a value for this with  `openssl`  then run  `rand -hex 32`                                                                                                                                                 	|
| SQLALCHEMY_DATABASE_URI 	| When running the database with docker locally, use `postgresql://postgres:postgres@localhost:5432/db`, you will need to change this variable when deploying to a production database URI.                                   	|
| UNSPLASH_CLIENT_ID      	| Optional variable,  you can get an API key by registering an account at [ Unsplash ]( https://unsplash.com/oauth/applications ), if you are not planning to test out the unsplash part of the app you can simply omit this. 	|                           	|

<br />

### Running Postgres and PgAdmin
> Docker is required to run Postgres and PgAdmin

```sh
docker-compose up
```

Postgres should be available on port 5432, you can open PgAdmin via localhost:5050 and login with admin@admin.com / root.
<br />
<br />
You can then connect to the postgres database with the credentials provided in the `docker-compose.yml` file (note that the host needs to be postgres instead of localhost)

<br />

### Applying database migrations
Make sure you have activated the virtual environment as mentioned in the earlier steps, then cd into `/app` folder, then run

```sh
alembic upgrade head
``` 

Verify if migrations have been applied

```sh
alembic history
```

## App Features

### Find recipes by specify image URL
- You can either provide the URL manually, select a sample image, or select an image from Unsplash
- After you submitted the form, a list of predictions will be provided for the given image
- You can then click on the 'Recipes' button to show relevant recipes

### Find recipes by uploading an image
- You can upload the image and submit the form to predict a list of concepts for the given image
- You can then click on the 'Recipes' button to show relevant recipes

### Find recipes by providing text based queries
- You can also find recipes by providing text based queries
- You can search with either the ingredient / meal name

### Save recipes to list
- You can save the recipes you want by clicking on the bookmark button on the recipe card 
- You can view the saved recipes by visiting the saved recipes page, you can also remove recipes you have saved so far

### Dark Theme
- You can switch between light / dark theme by clicking on the brightness icon at the nav bar

<br />

## Using docker-compose to run all the applications
The installation section earlier describes how to run each application independently. However if you want to run everything using docker-compose you can follow the steps here.

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

Then run the following command to apply database migrations
```sh
docker-compose exec backend alembic upgrade head
```

Verify if migrations have been applied

```sh
docker-compose exec backend alembic history
```



## License
Distributed under the MIT license. See ``LICENSE`` for more information.

<br />

## Appendix
- [FastAPI Official Documentation](https://fastapi.tiangolo.com/)
- [The FastAPI Ultimate Tutorial](https://christophergs.com/python/2021/12/04/fastapi-ultimate-tutorial/)
- [React with TypeScript](https://www.youtube.com/watch?v=ydkQlJhodio)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)
- [FastAPI with Alembic](https://testdriven.io/blog/fastapi-sqlmodel/#alembic) 
- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Clarifai API Documentation (Used in the older version of the app)](https://docs.clarifai.com/api-guide/predict/images)
- [Training Image Classification Model with Hugging Face](https://huggingface.co/docs/transformers/tasks/image_classification)
- [Hosting Machine Learning Model Demos with Gradio](https://huggingface.co/course/chapter9/1)

