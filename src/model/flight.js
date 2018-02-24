'use strict';

import mongoose from 'mongoose';
import Location from './location';
import httpError from 'http-errors';

const Flight = mongoose.Schema({
    From: { type: String, required: true },
    To: { type: String, required: true },
    FlightNumber: { type: Number, required: true },
    Departs: { type: Number, required: true },
    Arrives: { type: Number, required: true },
    MainCabinPrice: { type: Number, required: true },
    FirstClassPrice: { type: Number, required: true },
    locationId: {type: mongoose.Schema.Types.ObjectId, ref: 'location'},
});


module.exports = mongoose.model('flight', Flight);

Flight.create = function(locationId, flightInfo) {
    if(!flightInfo) return new httpError(400, 'location missing')
    
    // need to use Location in here... 
    // .populate() ??
    return Location.findById(locationId)
        .then(location => {
            return new Flight(flightInfo).save()
                .then(newFlight => {
                    location.flights.push(newFlight)
                    return location.save()
                        .then(newFlight => newFlight)
                        .then(() => next())
                        .catch(next);
                })
                .then(location => location)
                .then(() => next())
                .catch(next);
        })
}

Flight.fetchOne = function(locationId) {
    if(!locationId) return new httpError(400, 'flight id missing')

    return Flight.findById(locationId).populate()
}

Flight.fetchAll = function() {

    return Flight.find()
        .then(flights => flights)
        .then(() => next())
        .catch(next)
}

Flight.flightPlan = function() {
    
}

Flight.update = function() {

}

Flight.delete = function() {

}
