'use strict';

import Location from '../model/flight';
import httpErrors from 'http-errors';

const jsonParser = require('body-parser').json();

const locationRouter = module.exports = new require('express').Router();

locationRouter.post('/api/locations', jsonParser, (req, res, next) => {
    console.log('hit POST /api/locations');
    if(!locationName || !airportCode) return next(httpErrors(400, 'location needs a name and airport code'));

    return new Location(req.body).save()
        .then(location => res.json(location))
        .catch(next);
});

locationRouter.get('/api/locations/:id', (req, res, next) => {
    console.log('hit GET /api/locations/:id');

    return Location.findById(req.params.id).populate('flights')
        .then(location => {
            if(!location) 
                throw httpErrors(404, 'location not found');
            return res.json(location);
        })
        .catch(next);
});

locationRouter.get('/api/locations', (req, res, next) => {
    console.log('hit GET /api/locations');

    return Location.find({})
        .then(locations => res.json(locations))
        .catch(next);
});

locationRouter.put('/api/locations/:id', jsonParser, (req, res, next) => {
    console.log('hit PUT /api/locations/:id');
      let options = { new: true, runValidators: true };
      

    return Location.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(location => {
            if(!location)
                throw httpErrors(404, 'location not found');
            return res.json(location);
        })
        .catch(next);
});

locationRouter.delete('/api/locations/:id', (req, res, next) => {
    console.log('hit DELETE /api/locations/:id');
    
    return Location.findByIdAndRemove(req.params.id)
        .then(location => {
            if(!location)
                throw httpErrors(404, 'location not found');
            return res.sendStatus(204);
        })
        .catch(next);
});
