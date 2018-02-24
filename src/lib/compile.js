'use strict';

import assert from 'assert';
import getCSV from 'get-csv';
import mongoose from 'mongoose';
import Flight from '../model/flight';
import Location from '../model/location';

const compile = module.exports = {};

compile.csvGet = function() {
    mongoose.connect('mongodb://localhost/aa-dev');

    return getCSV('/Users/izzybaer/projects/alaska-airlines/alaska-airlines-backend/src/lib/airports.csv')
      .then(rows => {
        Location.collection.insertMany(rows, function(err, r) {
          assert.equal(null, err);
          assert.equal(rows.length, r.insertedCount);
          console.log('populated locationS');
        });
      }).then(data => {
          return getCSV('/Users/izzybaer/projects/alaska-airlines/alaska-airlines-backend/src/lib/flights.csv')
            .then(rows => {
              Flight.collection.insertMany(rows, function(err, r) {
                assert.equal(null, err);
                assert.equal(rows.length, r.insertedCount);
                mongoose.disconnect();
                console.log('populated flights');
              });
            }).catch(err => console.log(err));
      }).catch(err => console.log(err))
};