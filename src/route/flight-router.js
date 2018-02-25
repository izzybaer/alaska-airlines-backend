'use strict';

import {Router} from 'express';
import logger from '../lib/logger';
import httpErrors from 'http-errors';
import Flight from '../model/flight';
import compile from '../lib/compile';

const jsonParser = require('body-parser').json();
const flightRouter = module.exports = new Router();

flightRouter.post('/api/flights', jsonParser, (req, res, next) => {
    if(!req.body.From || !req.body.To || !req.body.FlightNumber){
        return next(httpErrors(400, 'Departure, Destination and FlightNumber required'));
    }

    return compile.csvGet()
        .then(() => res.sendStatus(200))
        .catch(next);
});

flightRouter.get('/api/flights', (req, res, next) => {

    Flight.fetchAll()
        .then(flights => res.json(flights))
        .catch(next);
});

flightRouter.get('/api/flights/search', (req, res, next) => {
    
    Flight.flightSearch(req.body.From, req.body.To)
      .then(flights => res.json(flights))
      .catch(next);
});

