'use strict';

import assert from 'assert';
import getCSV from 'get-csv';
import mongoose from 'mongoose';
import Flight from '../model/flight';
import Location from '../model/location';

const compile = module.exports = {};

compile.csvGet = function() {
    return getCSV(`${__dirname}/airports.csv`)
      .then(rows => {
        Location.collection.insertMany(rows, function(err, r) {
          assert.equal(null, err);
          assert.equal(rows.length, r.insertedCount);
          console.log('populated locations');
        });
      }).then(data => {
          return getCSV(`${__dirname}/flights.csv`)
            .then(rows => {
              Flight.collection.insertMany(rows, function(err, r) {
                assert.equal(null, err);
                assert.equal(rows.length, r.insertedCount);
                console.log('populated flights');
              });
            }).then(() => console.log('finished inserting to flights'))
              .catch(err => console.log(err));
      }).then(() => console.log('finished inserting to locations'))
      .catch(err => console.log(err))
};