'use strict';

import mongoose from 'mongoose';
import httpError from 'http-errors';

const locationSchema = mongoose.Schema({
    airportCode: {type: String, required: true, unique: true},
    locationName: {type: String, required: true, unique: true},
    flights: [{type: mongoose.Schema.Types.ObjectId, ref: 'flight'}],
})

const Location = mongoose.model('location', locationSchema);

Location.create = function(locationInfo) {
    if(!locationInfo) return new httpError(400, 'location name missing');

    return new Location(locationInfo).save()
        .then(newLocation => newLocation)
        .then(() => next())
        .catch(next);
}

Location.fetchOne = function(locationId) {
    if(!locationId) return new httpError(400, 'provide a location id')
    
    return Location.findById(locationId)
        .then(location => location)
        .then(() => next())
        .catch(next);
}

Location.fetchAll = function() {
    return Location.find()
        .then(location => location)
        .then(() => next())
        .catch(next);
}

Location.update = function(data, locationId) {
    if(!locationId) return new httpError(400, 'location id missing');
    if(!data) return new httpError(400, 'location data missing');

    return Location.findByIdAndUpdate(locationId, data)
        .then(location => location)
        .then(() => next())
        .catch(next);
}

Location.delete = function(locationId) {
    if(!locationId) return new httpError(400, 'location id missing')

    return Location.findByIdAndRemove(locationId)
        .then(location => location)
        .then(() => next())
        .catch(next);
}

export default Location;