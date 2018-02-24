'use strict';

import faker from 'faker';
import Location from '../../model/location';

const locationMock = module.exports = {};

let airportCodes = ['BWI', 'AER', 'ANC', 'ATL', 'BTR', 'AUS', 'BET', 'BHM', 'BUF'];

locationMock.create = () => {
    return new Locaton({
        Code: airportCodes[i],
        Name: faker.address.city(),
    }).save();
};

locationMock.createMany = (howMany) => {
    return Promise.all(new Array(howMany).fill(0)
        .map(() => locationMock.create()));
};

locationMock.remove = () => Location.remove({});