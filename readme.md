# User CRUD
# How to run: 

## Recommended to use docker to run this. If you choose not to run with the below docker commands, you need to set the app port as an enviroment variable APP_PORT and JWT_SECRET.

## Running a docker container on linux:
### docker run --rm -it --env-file .env -p 3000:3000 -v $(pwd):/work -w /work node:18.16.0 bash

## On windows:
### docker run --rm -it --env-file .env -p 3000:3000 -v %cd%:/work -w /work node:18.16.0 bash

## Then, we need to Install the deps:
### npm install

## Running the tests:
### npm run test
## Running the server:
### npm start

## Running the server in dev mode:
### npm run dev