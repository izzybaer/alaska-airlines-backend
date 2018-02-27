'use strict';

import mongoose from 'mongoose';
import httpError from 'http-errors';

const locationSchema = mongoose.Schema({
    Code: {type: String, required: true, unique: true},
    Name: {type: String, required: true, unique: true},
})

const Location = module.exports = mongoose.model('location', locationSchema);