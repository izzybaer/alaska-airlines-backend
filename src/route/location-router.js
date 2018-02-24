'use strict';

import {Router} from 'express';
import logger from '../lib/logger';
import httpErrors from 'http-errors';
import Location from '../model/location';
import * as compile from '../lib/compile';

const jsonParser = require('body-parser').json();
const locationRouter = module.exports = new Router();

locationRouter.post('/api/locations', jsonParser, (req, res, next) => {
    console.log('hit POST /api/locations');
    if(!req.body.Name || !req.body.Code) 
        return next(httpErrors(400, 'location needs a name and airport code'));
        
    return new Location(req.body).save()
      .then(location => {
        console.log('__REQ_BODY__', req.body);
        return compile.csvGet()
        console.log(req.body, 'REQ.BODY inside csvGet fn in POST route')
          .then(location => res.sendStatus(200).json(location))
          .catch(err => next(err));
    })
    .then(() => next())
    .catch(next);
});

locationRouter.get('/api/locations/:id', (req, res, next) => {
    console.log('hit GET /api/locations/:id');

    return Location.findById(req.params.id).populate('flights')
        .then(location => {
            if(!location) {
                throw httpErrors(404, 'location not found');
            }
            return res.json(location);
        }).catch(next);
});

locationRouter.get('/api/locations', (req, res, next) => {
    console.log('hit GET /api/locations');

    return Location.find({})
        .then(locations => res.json(locations))
        .catch(next);
});

locationRouter.put('/api/locations/:id', jsonParser, (req, res, next) => {
    console.log('hit PUT /api/locations/:id');

    // izzy - configures mongo update behavior
    let options = { new: true, runValidators: true };
      
    return Location.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(location => {
            if(!location) {
                throw httpErrors(404, 'location not found');
            }
            return res.json(location);
        }).catch(next);
});

locationRouter.delete('/api/locations/:id', (req, res, next) => {
    console.log('hit DELETE /api/locations/:id');
    
    return Location.findByIdAndRemove(req.params.id)
        .then(location => {
            if(!location) {
                throw httpErrors(404, 'location not found');
            }
            return res.sendStatus(204);
        }).catch(next);
})
