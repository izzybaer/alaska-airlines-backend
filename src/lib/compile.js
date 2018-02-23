'use strict';

const assert = require('assert');
const getCSV = require('get-csv');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const Flight = require('../model/flight');
const Location = require('../model/location');

const compile = module.exports = {};

compile.csvGet = function() {
    mongoose.connect(MONGODB_URI);
    // console.log('insideeeeeee getflights CSV');

    Flight.remove({}, function() {
        console.log('flight collection removed');
    });
    
    // Location.remove({}, function() {
    //     console.log('location collection removed')
    // })

    getCSV('/Users/izzybaer/projects/alaska-airlines/alaska-airlines-backend/src/lib/airports.csv')
      .then(rows => {
        Location.collection.insertMany(rows, function(err, r) {
          assert.equal(null, err);
          assert.equal(rows.length, r.insertedCount);
          console.log('populated locationS');
        });
      })
      .then(flight => {
        getCSV('/Users/izzybaer/projects/alaska-airlines/alaska-airlines-backend/src/lib/flights.csv') 
        .then(rows => {
            Flight.collection.insertMany(rows, function(err, r) {
                assert.equal(null, err);
                assert.equal(rows.length, r.insertedCount);
                mongoose.disconnect();
                console.log('populated flights')
            })
        }).then(() => {
            return 'done';
        })
      }).catch(err => console.log(err));
}

// compile.csvGetAirports = function() {
//     let airportsPath = './airports.csv';

//     return getCSV(airportsPath)
//         .then(rows => console.log(rows))

// }



