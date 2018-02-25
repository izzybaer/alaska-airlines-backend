'use strict';

import faker from 'faker';
import locationMock from './location-mock';
import Flight from '../../model/flight';
import mongoose from 'mongoose'

const flightMock = module.exports = {};

flightMock.create = () => {
    return new Flight({
        To: faker.lorem.word(3),
        From: faker.lorem.word(3),
        FlightNumber: faker.random.number(4),
    }).save();
};

flightMock.flight = ({
        To: faker.lorem.word(3),
        From: faker.lorem.word(3),
        FlightNumber: faker.random.number(),
    })

flightMock.createMany = (howMany) => {
    return Promise.all(new Array(howMany).fill(0)
        .map(() => flightMock.create()));
};

flightMock.cleanDB = () => Promise.all([Flight.remove({})]);