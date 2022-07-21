# Recipes Finder

Find recipes by providing image url, uploading image, or providing text based queries 

## Installation

### Running Backend

OS X & Linux:

```sh
source venv/bin/activate
pip install -r requirements.txt
cd backend
uvicorn app.main:app --reload
```

Windows:
```sh
venv\Scripts\activate
pip install -r requirements.txt
cd backend
uvicorn app.main:app --reload
```

The backend app should be running on localhost:8000, 
you can visit localhost:8000/docs for the API documentation

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
Make sure you have activated the virtual environment as mentioned in the earlier steps, then run

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

## License
Distributed under the MIT license. See ``LICENSE`` for more information.
 