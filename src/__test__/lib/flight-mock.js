'use strict';

import faker from 'faker';
import locationMock from './location-mock';
import Flight from '../../model/flight';

const flightMock = module.exports = {};

let airportCodes = ['BWI', 'AER', 'ANC', 'ATL', 'BTR', 'AUS', 'BET', 'BHM', 'BUF'];

flightMock.create = () => {
    let mock = {};

    return locationMock.create()
        .then(location => {
            mock.location = location;

            return new Flight({
                To: airportCodes[i],
                From: airportCodes[i - 1],
                FlightNumber: faker.random.number(4),
            }).save();
        })
        .then(flight => {
            mock.flight = flight;
            return mock;
        });
};

flightMock.createMany = (howMany) => {
    let mock = {};

    return locationMock.create()
        .then(location => {
            mock.location = location;
            return Promise.all(new Array(howMany)
                .fill(0)
                .map(() => {
                    return new Flight({
                        To: airportCodes[i],
                        From: airportCodes[i - 1],
                        FlightNumber: faker.random.number(4),
                    }).save();
                }));
        })
        .then(flights => {
            mock.flights = flights;
            return mock;
        });
};

flightMock.remove = () => Promise.all([
    Flight.remove({}),
    locationMock.remove(),
]);