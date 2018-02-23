'use strict';

import mongoose from 'mongoose';
import Location from './location';
import httpError from 'http-errors';

const Flight = mongoose.Schema({
    From: { type: String, required: true },
    To: { type: String, required: true },
    FlightNumber: { type: String, required: true },
    Departs: { type: String, required: true },
    Arrives: { type: String, required: true },
    MainCabinPrice: { type: String, required: true },
    FirstClassPrice: { type: String, required: true },
    // locationId: {type: mongoose.Schema.Types.ObjectId, ref: 'location'},
});

// const Flight = mongoose.Schema(
//   {
//     From: { type: String, required: true },
//     To: { type: String, required: true },
//     FlightNumber: { type: String, required: true },
//     Departs: { type: String, required: true },
//     Arrives: { type: String, required: true },
//     MainCabinPrice: { type: String, required: true },
//     FirstClassPrice: { type: String, required: true }
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model('flight', Flight);

// Flight.create = function(locationId, flightInfo) {
//     if(!flightInfo) return new httpError(400, 'location missing')
    
//     // need to use Location in here... 
//     // .populate() ??
//     return Location.findById(locationId)
//         .then(location => {
//             return new Flight(flightInfo).save()
//                 .then(newFlight => {
//                     location.flights.push(newFlight)
//                     return location.save()
//                         .then(newFlight => newFlight)
//                         .then(() => next())
//                         .catch(next);
//                 })
//                 .then(location => location)
//                 .then(() => next())
//                 .catch(next);
//         })
// }

// Flight.fetchOne = function(flightId) {
//     if(!flightId) return new httpError(400, 'flight id missing')

//     return Flight.findById(flightId).populate()
// }

// Flight.fetchAll = function() {

//     return Flight.find()
//         .then(flights => flights)
//         .then(() => next())
//         .catch(next)
// }

// Flight.flightPlan = function() {
    
// }

// Flight.update = function() {

// }

// Flight.delete = function() {

// }
