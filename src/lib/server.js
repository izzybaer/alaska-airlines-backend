'use strict';

// izzy - modules
import logger from './logger';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// izzy - module logic - * config and connect to mongo
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/aa-dev');

// izzy - create app
const app = express();

// izzy - need body parser
app.use(bodyParser.json());

app.use(require('./logger-middleware'));

// izzy - load routes
// app.use(require('../route/location-router'));
app.use(require('../route/flight-router'));

// izzy - load error middleware
app.use(require('./error-middleware'));

// export server start and server stop
const server = module.exports = {};

server.isOn = false;

server.start = () => {
    return new Promise((resolve, reject) => {
        if(!server.isOn) {
            server.http = app.listen(process.env.PORT, () => {
                console.log(`__SERVER__: is running on  ${process.env.PORT}`);
                resolve();
            })
            return
        }
        reject(new Error('__SERVER__: is already running'));
    })
}

server.stop = () => {
    return new Promise((resolve, reject) => {
        if(server.http && server.isOn) {
            return server.http.close(() => {
                server.isOn = false;
                console.log('__SERVER__: off');
                resolve();
            })
        }
        reject(new Error('__SERVER__: not running'));
    })
}




