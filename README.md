# Recipes Finder

Find recipes by providing image url, uploading image, or providing text based queries

https://user-images.githubusercontent.com/70843788/180226142-426d0c55-19e6-45d2-9421-8079ed404b38.mp4

## Live Demo
[Demo](https://recipes-finder-1234.herokuapp.com/)

## Installation

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

## License
Distributed under the MIT license. See ``LICENSE`` for more information.
 
