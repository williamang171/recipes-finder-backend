# Recipes Finder

Find recipes by providing text based queries, image urls, or uploading images

## Project Diagram
![diagram](/documentation/recipes-finder.drawio.png)

## Screenshots

### Home
![home](/documentation/home-page.png)

### Login / Sign Up with Auth0
![login](/documentation/login-signup.png) 

### Search Recipes by Query
![search-recipes-query](/documentation/search-recipes-query.png)

### Search Recipes by Image
![search-recipes-image](/documentation/search-recipes-image.png)

![search-recipes-image](/documentation/search-recipes-image-result.png)

## Front End Repository

https://github.com/williamang171/recipes-finder-frontend

## Environment Setup

Create a new `.env` file from `.env.sample` in the `app` folder, then refer to the following table on how to setup the environment variables, for unmentioned variables you can keep it the same as in `.env.sample`

## Environment Variables
| Key            | Description                                                                                                                                                                                                                            |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AUTH0_DOMAIN   | auth0 domain, you can get this by creating your own auth0 account at https://auth0.com/, you can refer to the guide here https://developer.auth0.com/resources/code-samples/full-stack to learn more about how to integrate with auth0 |
| AUTH0_AUDIENCE | auth0 audience, like AUTH0_DOMAIN, you can get this by creating your own auth0 account at https://auth0.com/                                                                                                                           |

## Running the app

OS X & Linux:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd app
./run-dev.sh
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

<br />

## Appendix

### Backend

- [FastAPI Official Documentation](https://fastapi.tiangolo.com/)
- [The FastAPI Ultimate Tutorial](https://christophergs.com/python/2021/12/04/fastapi-ultimate-tutorial/)
- [FastAPI with Alembic](https://testdriven.io/blog/fastapi-sqlmodel/#alembic)

### Frontend

- [React with TypeScript](https://www.youtube.com/watch?v=ydkQlJhodio)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)

### Auth0

- [Auth0 Integration Full Stack](https://developer.auth0.com/resources/code-samples/full-stack)

### Machine Learning with Hugging Face

- [Training Image Classification Model with Hugging Face](https://huggingface.co/docs/transformers/tasks/image_classification)
- [Hosting Machine Learning Model Demos with Gradio](https://huggingface.co/course/chapter9/1)

## License

Distributed under the MIT license. See `LICENSE` for more information.
