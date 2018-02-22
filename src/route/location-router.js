'use strict';

import Location from '../model/flight';

const jsonParser = require('body-parser').json();
const locationRouter = module.exports = new require('express').Router();

locationRouter.post('/api/locations', jsonParser, (req, res, next) => {
    console.log('hit POST /api/locations');
    new Location(req.body).save()
        .then(location => res.json(location))
        .catch(next);
})

locationRouter.get('/api/locations/:id', (req, res, next) => {
    console.log('hit GET /api/locations/:id');

    Location.findById(req.params.id).populate('flights')
        .then(location => res.json(location))
        .catch(next);
})

locationRouter.get('/api/locations', (req, res, next) => {
    console.log('hit GET /api/locations');

    Location.find({})
    .then(locations => res.json(locations))
    .catch(next);
})

locationRouter.put('/api/locations/:id', jsonParser, (req, res, next) => {
    console.log('hit PUT /api/locations/:id');

    Location.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(location => res.json(location))
        .catch(next);
})

locationRouter.delete('/api/locations/:id', (req, res, next) => {
    console.log('hit DELETE /api/locations/:id');
    
    Location.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(204))
        .catch(next);
})
