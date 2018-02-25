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
        return next(httpErrors(400, 'From, To, and FlightNumber are required'));
    }
    console.log('hit POST /api/flights');
    return compile.csvGet()
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err));
});

flightRouter.get('/api/flights', (req, res, next) => {
    console.log('hit GET /api/flights');

    Flight.fetchAll()
        .then(flights => res.json(flights))
        .catch(next);
});

flightRouter.get('/api/flights/search', (req, res, next) => {
    console.log('hit GET /api/flights/search');
    
    Flight.flightSearch(req.params.To, req.params.From)
      .then(flights => res.json(flights))
      .catch(err => new Error(err.status, err.message));
});

// flightRouter.get('/api/flights/search/price', jsonParser, (req, res, next) => {
//     console.log('hit GET /api/flights/search/price');
    
        
//     return Flight.fetchAll()
//       .then(flights => res.json(flights))
//       .catch(err => next(err));
// });

// flightRouter.get('/api/flights/search/departure', jsonParser, (req, res, next) => {
//     console.log('hit GET /api/flights/search/depature');
    
        
//     return Flight.fetchAll()
//       .then(flights => res.json(flights))
//       .catch(err => next(err));
// });