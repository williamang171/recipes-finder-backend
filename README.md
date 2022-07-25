# Recipes Finder

Find recipes by providing image url, uploading image, or providing text based queries

https://user-images.githubusercontent.com/70843788/180822275-84774ddb-3680-405d-800d-42e5360379c8.mp4

## Live Demo
[Demo](https://recipes-finder-1234.herokuapp.com/)

## Installation

### Environment Variables
Create a `.env` file inside the `backend` folder, copy over the content of `.env.example` and replace with actual variables.

`CLARIFAI_APP_ID`, `CLARIFAI_USER_ID`, `CLARIFAI_KEY`: You can get these values by signing up an account at [Clarifai](https://www.clarifai.com/) and creating an app

`RECAPTCHA_SECRET`: You can get a secret key by creating a new site at [Google reCAPTCHA](https://www.google.com/recaptcha/admin/site/480947030)

`JWT_SECRET_KEY`: You can generate a value for this with 
```sh
openssl rand -hex 32
```

`UNSPLASH_CLIENT_ID` (Optional) : You can get an API key by registering an account at [Unsplash](https://unsplash.com/oauth/applications), if you are not planning to test out the unsplash part of the app you can simply omit this.

<br />

### Environment Variables (Frontend)
Replace the `REACT_APP_RECAPTCHA_SITE_KEY` with your own reCAPTCHA site key that matches with the secret key in the backend application

<br />

### Running Backend

OS X & Linux:

```sh
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd backend
uvicorn app.main:app --reload
```

Windows:
```sh
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd backend
uvicorn app.main:app --reload
```

The backend app should be running on [localhost:8000](localhost:8000), 
you can visit [localhost:8000/docs](localhost:8000/docs) for the API documentation

<br />

### Running Frontend
```sh
cd frontend
npm install
npm run start
```
App should be running on localhost:3000

<br />

### Running Postgres and PgAdmin
```sh
docker-compose up
```

Postgres should be available on port 5432, you can open PgAdmin via localhost:5050 and login with admin@admin.com / root.
<br />
<br />
You can then connect to the postgres database with the credentials provided in the `docker-compose.yml` file (note that the host needs to be postgres instead of localhost)

<br />

### Applying database migrations
Make sure you have activated the virtual environment as mentioned in the earlier steps, then cd into /backend folder, then run

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

## Reference / Learning Materials
- [FastAPI Official Documentation](https://fastapi.tiangolo.com/)
- [The FastAPI Ultimate Tutorial](https://christophergs.com/python/2021/12/04/fastapi-ultimate-tutorial/)
- [React with TypeScript](https://www.youtube.com/watch?v=ydkQlJhodio)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)
- [FastAPI with Alembic](https://testdriven.io/blog/fastapi-sqlmodel/#alembic) 
- [Clarifai API Documentation](https://docs.clarifai.com/api-guide/predict/images)
- [Unsplash API Documentation](https://unsplash.com/documentation)
