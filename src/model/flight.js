'use strict';

import Promise from 'bluebird';
import mongoose from 'mongoose';
import Location from './location';
import httpError from 'http-errors';

const flightSchema = mongoose.Schema({
    Departs: { type: Number },
    Arrives: { type: Number },
    FlightNumber: { type: Number, required: true, unique: true},
    MainCabinPrice: { type: Number },
    FirstClassPrice: { type: Number },
    To: { type: String, required: true },
    From: { type: String, required: true },
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
