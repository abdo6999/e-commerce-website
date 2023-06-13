# Store-api
This repo contains the backend application for an eCommerce store front. It is a RESTful API.

The database schema and and API route information can be found in the [requirements doc](REQUIREMENTS.md).

## start the project

1.  clone the repo
2.  run npm install
3.  set up .env file
4.  npm run create-test-db and npm run create-db
5.  run npm start to serve

## script

### build

npm run build to build the project. The build artifacts will be stored in the `dist/` directory.

### test

1. npm run test to to execute the unit tests with jasmine

### serve

npm run start to run a dev server.

### lint

npm run lint to run a eslint.

### prettier

npm run prettier to run a dev server.

### run build version

node dist/. to run the build version

### up

npm run up will do up to migratetion

### down

npm run down will do down to migratetion

### create database

npm run create-db

### create test database

npm run create-test-db


## Environment variables

### Ports

The application runs on port `3000` with database on `5432`.

POSTGRES_HOST = '127.0.0.1'

POSTGRES_DB = 'store'

POSTGRES_USER = postgres_user

POSTGRES_PASSWORD = postgres_password

POSTGRES_TEST_DB = 'store_test'

PEPPER='storeDCRYPT_PASSWORD_'

SALT_ROUNDS= '10'

ACCESS_TOKEN_SECRET = '3aec27d374fb1b37b3272fea86a9693ded1fabe6be120569d44c85ca755995dd99e1f1751f18add0b6e7ee0d9ebf724156b892c3ee8719d336c5c9508d0
e074b'

REFRESH_TOKEN_SECRET = '0c4d35e88edc1aecb86d9021f487dccb93272e7444a982d4b046cca53cd98694e89ca6a6376a9b62f4f60a93584b0e3c9258d85cf7a3778b14fa895f5b0
cc3d4'
