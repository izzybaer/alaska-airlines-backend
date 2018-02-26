
'use strict';

import mongoose from 'mongoose';
import httpError from 'http-errors';

const locationSchema = mongoose.Schema({
    Code: {type: String, required: true, unique: true},
    Name: {type: String, required: true, unique: true},
    // flights: [{type: mongoose.Schema.Types.ObjectId, ref: 'flight'}],
})

const Location = module.exports = mongoose.model('location', locationSchema);