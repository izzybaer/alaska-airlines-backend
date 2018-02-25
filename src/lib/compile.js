'use strict';

import assert from 'assert';
import getCSV from 'get-csv';
import mongoose from 'mongoose';
import Flight from '../model/flight';
import Location from '../model/location';

const compile = module.exports = {};

compile.csvGet = function() {
    // mongoose.connect('mongodb://localhost/aa-dev');

    return getCSV(`${__dirname}/airports.csv`)
      .then(rows => {
        Location.collection.insertMany(rows, function(err) {
          console.log('populated locations');
        });
      }).then(data => {
          return getCSV(`${__dirname}/flights.csv`)
            .then(rows => {
              Flight.collection.insertMany(rows, function(err) {
                // mongoose.disconnect();
                console.log('populated flights');
              });
            }).catch(err => console.log(err));
      }).catch(err => console.log(err))
};