'use strict';

import Promise from 'bluebird';
import mongoose from 'mongoose';
import Location from './location';
import httpError from 'http-errors';

const flightSchema = mongoose.Schema({
    To: { type: String, required: true },
    From: { type: String, required: true },
    Departs: { type: Number, required: true },
    Arrives: { type: Number, required: true },
    FlightNumber: { type: Number, required: true },
    MainCabinPrice: { type: Number, required: true },
    FirstClassPrice: { type: Number, required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
});


const Flight = module.exports = mongoose.model('flight', flightSchema);


Flight.flightSearch = function(from, to) {

    return Flight.find({ From: from, To: to })
      .then(flights => Promise.resolve(flights))
      .catch(err => Promise.reject(new httpError(err.status, err.message)));
};

Flight.fetchAll = function() {

    return Flight.find()
        .then(flights => Promise.resolve(flights))
        .catch(err => Promise.reject(new httpError(err.status, err.message)));
}

export default Flight;


// Flight.fetchOne = function(To, From) {
//     if(!To || !From) return new httpError(400, 'missing required To and From feilds')

//     return Flight.findOne()
//         .then(flights => flights)
//         .then(() => next())
//         .catch(next)
// }

