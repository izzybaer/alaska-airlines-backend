'use strict'

require('./setup');

import server from '../lib/server';
import superagent from 'superagent';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/api/locations', () => {
    beforeAll(server.start);
    afterAll(server.stop);
    afterEach(locationRemove);

    describe('POST /api/locations', () => {
        it('should return a 200 and a location if there are no errors', () => {
            return superagent.post(`${apiURL}/api/locations`)
                .send({
                    "Name": "Baltimore",
                    "Code": "BWI",
                })
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.body).toBeTruthy();
                });
        });
    });
});