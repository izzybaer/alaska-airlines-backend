'use strict'

require('./lib/setup');

import server from '../lib/server';
import superagent from 'superagent';
import locationMock from './lib/location-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/api/locations', () => {
    beforeAll(server.start);
    afterAll(server.stop);
    afterEach(locationMock.remove);

    describe('POST /api/locations', () => {
        it('should respond with a 200 status and a location if there are no errors', () => {
            return superagent.post(`${apiURL}/api/locations`)
                .send({
                    'Name': 'Baltimore',
                    'Code': 'BWI',
                })
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.body.Code).toEqual('BWI');
                });
        });

        it('should respond with a 409 for a duplicate key', () => {
            return locationMock.create()
                .then(location => {
                    return superagent.post(`${apiURL}/api/locations`)
                })
        })
    });

    describe('GET /api/locations', () => {
        it('should respond with a 200 status and a location if there are no errors', () => {
            let tempLocationMock;

            return locationMock.create()
                .then(location => {
                    tempLocationMock = location;
                    return superagent.get(`${apiURL}/api/locations`);
                })
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(JSON.stringify(res.body.Code)).toEqual(JSON.stringify(tempLocationMock.Code));
                });
        });
    });
});