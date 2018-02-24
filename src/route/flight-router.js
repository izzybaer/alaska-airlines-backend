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
        .catch(err => next(err));
});

flightRouter.get('/api/flights/:id', (req, res, next) => {
    console.log('hit GET /api/flights/:id');

    return Flight.findById(req.params.id).populate('location') // izzy - use this with care
        .then(flight => { // with great power comes great responsibility
            if(!flight) {
                throw httpErrors(404, 'flight not found')
            }
            return res.json(flight)
        }).catch(next);
});

flightRouter.get('/api/flights', (req, res, next) => {
    console.log('hit GET /api/flights');

    let allFlights = null;

    return Flight.find({})
        .then(flights => {
            allFlights = flights;
            return Flight.find({});
        })
        .then(flightCount => {
            // izzy- no access to 'flights'
            let responseData = {
                count: flightCount,
                data: allFlights,
            };
            res.json(responseData);
        });
});

flightRouter.put('/api/flights/:id', jsonParser, (req, res, next) => {
    console.log('hit PUT /api/flights/:id');

    // izzy - configures mongo update behavior
    let options = {new: true, runValidators: true};

    // izzy - additional validation before updating
    return Flight.findByIdAndUpdate(req.params.id, req.body, options)
        .then(flight => {
            if(!flight) {
                throw httpErrors(404, 'flight not found');
            }
            return res.json(flight);
        }).catch(next);
});

flightRouter.delete('/api/flights/:id', (req, res, next) => {
     console.log('hit DELETE /api/flights/:id');
     
        return Flight.findByIdAndRemove(req.params.id)
            .then(flight => {
                if(!flight) {
                    throw httpErrors(404, 'flight not found');
                }
                return res.sendStatus(204);
            }).catch(next);
});