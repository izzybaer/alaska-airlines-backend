'use strict';

const assert = require('assert');
const getCSV = require('get-csv');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const Flight = require('../model/flight');
const Location = require('../model/location');

const compile = module.exports = {};

compile.csvGetFlights = function() {
    mongoose.connect(MONGODB_URI);
    console.log('insideeeeeee getflights CSV');

    Flight.remove({}, function() {
        console.log('collection removed');
    });

    console.log('inside the csv function')
    return getCSV('/Users/izzybaer/projects/alaska-airlines/alaska-airlines-backend/src/lib/f.csv') 
        .then(rows => {
            Flight.collection.insertMany(rows, function(err, r) {
                assert.equal(null, err);
                assert.equal(rows.length, r.insertedCount);
                mongoose.disconnect()
                console.log('populated locations with flights')
            })

        }).then(() => {
            return 'done';
        }).catch(err => console.log(err));
}

// compile.csvGetAirports = function() {
//     let airportsPath = './airports.csv';

//     return getCSV(airportsPath)
//         .then(rows => console.log(rows))

// }



