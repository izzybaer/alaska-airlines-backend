'use strict';

import mongoose from 'mongoose';

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
  locationId: {type: Schema.Types.ObjectId, ref: 'location'},
});

const Flight = mongoose.model('flight', flightSchema);

export default Flight;