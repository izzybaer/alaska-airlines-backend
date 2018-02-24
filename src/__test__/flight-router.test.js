'use strict'

require('./setup');

import server from '../lib/server';
import superagent from 'superagent';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/api/flights', () => {
    beforeAll(server.start);
    afterAll(server.stop);
    // afterEach(flightRemove);

    describe('POST /api/flights', () => {
        it('should return a 200 and a flight if there are no errors', () => {
            return superagent.post(`${apiURL}/api/flights`)
                .send({
                    'To': 'SEA',
                    'From': 'LAS',
                    'FlightNumber': 8973,
                })
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.body).toBeTruthy();
                });
            });
        });
});