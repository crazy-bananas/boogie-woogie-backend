# Overview 
Dancing game app which scores your dance moves and also allows you to save your dance moves. This project was created as a part of senior project during our time at Code Chrysalis. We created this project in 3 weeks. This repository has code only for the backend of this project. Frontend repo is here https://github.com/crazy-bananas/boogie-woogie

## Technologies used:

- Express server
- MongoDB
- Mongoose

## Pre-requisites before getting started
In order to get started you need following accounts:

- Mongo DB database locally on your computer OR on cloud like Atlas
- Auth0 account
- Create .env file in root directory

## Environment variables
DB_USER_NAME
DB_PASSWORD
COLLECTION_NAME_SONGS
DB_URL
MGMT_API_ACCESS_TOKEN
AUTH_DOMAIN
PORT

First four environment variables should be from MongoDB and next two should be from Auth0. Last environment variable is the port number where you want to start your server

## Enpoints
GET /api/songs  
POST /api/songs  
GET /api/songs/:titleOrCode  
GET /api/moves/:songcodeOrMoveid  
POST /api/moves  
POST /api/scores  
GET /api/scores  
GET /api/scores/:songId/:moveId  
GET /api/scores/:userId  
POST /api/users  
GET /api/users/:userID  

## How to get started

To install dependencies
```
yarn
```
Start the server on PORT specified in environment variables Or your system port
```
yarn start
```

## Acknowledgement
Code Chrysalis
