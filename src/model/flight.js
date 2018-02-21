'use strict';

import mongoose from 'mongoose';
import Location from './location';
import httpError from 'http-errors';

const flightSchema = mongoose.Schema({
  arrival: { type: String, required: true },
  departure: { type: String, required: true },
  arrivalTime: { type: Number, required: true },
  flightNumber: { type: Number, required: true },
  departureTime: { type: Number, required: true },
  departureCode: { type: String, required: true },
  destinationCode: { type: String, required: true },
  coachClassPrice: { type: Number, required: true },
  coachClassCount: { type: Number, required: true },
  firstClassPrice: { type: Number, required: true },
  firstClassCount: { type: Number, required: true },
  locationId: {type: mongoose.Schema.Types.ObjectId, ref: 'location'},
});

const Flight = mongoose.model('flight', flightSchema);

Flight.create = function(locationId, flightInfo) {
    if(!locationId) return new httpError(400, 'location missing')
    
    // need to use Location in here
    return new Flight(locationId).save()
        .then(newFlight => newFlight)
        .then(() => next())
        .catch(next);
}

Flight.fetchOne = function(flightId) {
    if(!flightId) return new httpError(400, 'flight id missing')

    return Flight.findById(flightId).populate()
}

Flight.fetchAll = function() {

    return Flight.find()
        .then(flights => flights)
        .then(() => next())
        .catch(next)
}
export default Flight;