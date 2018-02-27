'use strict';

import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpError from 'http-errors';

const flightSchema = mongoose.Schema({
    MainCabinPrice: { type: Number },
    FirstClassPrice: { type: Number },
    DepartsMilitary: { type: Number },
    To: { type: String, required: true },
    From: { type: String, required: true },
    Arrives: { type: String, required: true },
    Departs: { type: String, required: true },
    FlightNumber: { type: Number, unique: true },
});

const Flight = module.exports = mongoose.model('flight', flightSchema);


Flight.flightSearch = function(from, to) {

    return Flight.find({ From: from}).where({ To: to }).exec()
      .then(flights => Promise.resolve(flights))
      .catch(err => Promise.reject(new httpError(err.status, err.message)));
};

Flight.fetchAll = function() {

    return Flight.find()
        .then(flights => Promise.resolve(flights))
        .catch(err => Promise.reject(new httpError(err.status, err.message)));
};

export default Flight;
