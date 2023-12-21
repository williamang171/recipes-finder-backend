# Recipes Finder

> Find recipes by providing text based queries, image urls, or uploading images

![alt text](/assets/recipes-finder-v5.png)

https://github.com/williamang171/recipes-finder-backend/assets/70843788/998885ed-23df-4d3f-9399-606a503aee87

## Front End Repository

https://github.com/williamang171/recipes-finder-frontend

## Environment Setup

Create a new `.env` file from `.env.sample` in the `app`, then refer to the following table on setting the the environment variables

## Environment Variables

| Key                 |                                                                                                              Description                                                                                                               |
| ------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| JWT_SECRET_KEY      |                                                    You can generate a value for this with `openssl rand -base64 64` , if you using Windows, you can use Git Bash to run the command                                                    |
| REDIS_PW            |                                                                                 redis password (you can leave it as the default based on .env.sample)                                                                                  |
| REDIS_HOST          |                                                                                   redis host (you can leave it as the default based on .env.sample)                                                                                    |
| REDIS_PORT          |                                                                                   redis port (you can leave it as the default based on .env.sample)                                                                                    |
| REDIS_URL           |                                                                        redis url, used for rate limiting (you can leave it as the default based on .env.sample)                                                                        |
| SPOONACULAR_API_KEY |                                                                  spoonacular api key, you can get one by registering an account via https://spoonacular.com/food-api                                                                   |
| AUTH0_DOMAIN        | auth0 domain, you can get this by creating your own auth0 account at https://auth0.com/, you can refer to the guide here https://developer.auth0.com/resources/code-samples/full-stack to learn more about how to integrate with auth0 |
| AUTH0_AUDIENCE      |                                                              auth0 audience, like AUTH0_DOMAIN, you can get this by creating your own auth0 account at https://auth0.com/                                                              |
| GCP_PROJECT_ID      |                                                                                              optional, used for deployment via cloud run                                                                                               |
| GCP_CONTAINER_NAME  |                                                                                              optional, used for deployment via cloud run                                                                                               |

## Running the app

> Docker is required to be installed on your machine before running the app

OS X & Linux:

```sh
docker compose up -d
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd app
./run-dev.sh
```

Windows:

```sh
docker compose up -d
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
