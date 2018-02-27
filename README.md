# alaska-airlines-backend

This is a full stack javascript flight tracker. The frontend was built using React, Bootstrap and Material-UI, the backend was built with MongoDB, Node, and Express. This entire app utilizes Promises.

## tech / frameworks

### frontend:
- node.js
    - babel-core
    - babel-jest
    - babel-loader
    - babel-preset-env
    - babel-preset-react
    - clean-webpack-plugin
    - css-loader
    - dotenv
    - express
    - extract-text-webpack-plugin
    - html-webpack-plugin
    - material-ui
    - node-sass
    - react
    - react-dom
    - react-redux
    - react-router-dom
    - resolve-url-loader
    - sass-loader
    - superagent
    - uglifyjs-webpack-plugin
    - url-loader
    - webpack
    - webpack-cli
    - webpack-dev-server
    - eslint
    - eslint-plugin-react
    - jest
    - bootstrap
    - react-bootstrap

## app features

    * user is able to search for flights between two locations (airport codes)
    * user is able to see a list of flights matching the search params
    * user is able to sort flights by departure or price(first class and main cabin)

## models

    * flightSchema
        * To
        * From
        * Departs
        * Arrives
        * FlightNumber
        * DepartsMilitary

    * locationSchema
        * Name
        * Code

## routes

### POST /api/flights

    * this route makes a POST request which invokes csv.Get(), a function that uses get-csv to retrieve data from the provided csv files, and populates mongodb with flights

### GET /api/flights

    * this route uses mongoose's `.find()` to retrieve all flights from the database

## GET /api/flights/search

    * this route uses mongoose's `.find().where().exec()` to perform a deep query for the `From` and `To` properties(of the flightSchema) provided by the user
        * this route fetches flights that have matching `To` and `From` queries
    
## tests

    * all tests are run through jests testing suite on the backend
    * jest was used to test POST and GET routes

## how to use

    * fork and clone both frontend and backend repos into a directory
        * https://github.com/izzybaer/alaska-airlines-frontend
        * https://github.com/izzybaer/alaska-airlines-backend 

    * open a terminal tab for the frontend, and one for the backend
    * run `yarn install` in both the backend tab and the frontend tab
    * open at least one more terminal tab for the backend
        * run `yarn dbon` in one tab - wait a couple seconds for mongodb to connect
        * run `yarn start` in another tab - wait a couple seconds for the server to start
    * in the frontend terminal tab 
        * run `yarn watch` and wait for webpack to compile successfully
    * in **Chrome** (because its the best)
        * navigate to `http://localhost:8080`

## contributions
    
    * if you want to contribute
        * maybe you have a great idea for refactoring
        * maybe you have more optimal solutions for fetching data and virtual DOM rendering
        * make a PR! 
        
## now you can get started searching for flights!

## credits

[Izzy Baer](https://github.com/izzybaer)
