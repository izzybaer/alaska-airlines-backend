'use strict';

import {Router} from 'express';
import logger from '../lib/logger';
import httpErrors from 'http-errors';
import Flight from '../model/flight';
import compile from '../lib/compile';

const flightRouter = module.exports = new Router();

flightRouter.post('/api/flights', (req, res, next) => {

    return compile.csvGet()
        .then(res => res.sendStatus(res.status))
        .catch(err => new httpErrors(err.status, err.message));
});

flightRouter.get('/api/flights',(req, res, next) => {

    return Flight.fetchAll()
      .then(flights => {
          res.json(flights);
      })
      .catch(err => new httpErrors(err.status, err.message));
});

flightRouter.get('/api/flights/:From/:To', (req, res, next) => {
    
    return Flight.flightSearch(req.params.From, req.params.To)
      .then(flights => res.json(flights))
      .catch(err => new httpErrors(err.status, err.message));
});

