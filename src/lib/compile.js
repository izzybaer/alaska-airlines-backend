'use strict';

import assert from 'assert';
import getCSV from 'get-csv';
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;
import Flight from '../model/flight';
import Location from '../model/location';

const compile = module.exports = {};

compile.csvGet = function() {
    mongoose.connect(MONGODB_URI);
    console.log('insideeeeeee getflights CSV');

    // Flight.remove({}, function() {
    //     console.log('flight collection removed');
    // });

    return getCSV('/Users/izzybaer/projects/alaska-airlines/alaska-airlines-backend/src/lib/airports.csv')
      .then(rows => {
        Location.collection.insertMany(rows, function(err, r) {
          assert.equal(null, err);
          assert.equal(rows.length, r.insertedCount);
          console.log('populated locationS');
        });
      }).then(data => {

          return getCSV("/Users/izzybaer/projects/alaska-airlines/alaska-airlines-backend/src/lib/flights.csv")
            .then(rows => {
              Flight.collection.insertMany(rows, function(err, r) {
                assert.equal(null, err);
                assert.equal(rows.length, r.insertedCount);
                mongoose.disconnect();
                console.log("populated flights");
              });
            })
            .catch(err => console.log(err));
      })
}

// compile.csvGetAirports = function() {
//     let airportsPath = './airports.csv';

//     return getCSV(airportsPath)
//         .then(rows => console.log(rows))

// }



