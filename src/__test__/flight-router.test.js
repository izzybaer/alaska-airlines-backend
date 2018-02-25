'use strict'

require('./lib/setup');

import server from '../lib/server';
import superagent from 'superagent';
import Flight from '../model/flight';

const apiURL = `http://localhost:${process.env.PORT}`;

const flightMock = () => {
    return new Flight({
        To: 
    })
}

describe('/api/flights', () => {
    beforeAll(server.start);
    afterAll(server.stop);
    afterEach(flightMock.remove);

    describe('POST /api/flights', () => {
        it('should respond with a 200 and a flight if there are no errors', () => {
            return superagent.post(`${apiURL}/api/flights`)
                .send({
                    To: 'SEA',
                    From: 'LAS',
                    FlightNumber: 8973,
                })
                .then(res => {
                    expect(res.status).toEqual(200);
                    expect(res.body).toBeTruthy();
                });
            });
        
        it('should respond with a 409 due to a duplicate flight number', () => {
            return flightMock.create()
                .then(flight => {
                    return superagent.post(`${apiURL}/api/flights`)
                        .send({
                            To: 'LAX',
                            From: 'SEA',
                            FlightNumber: flight.FlightNumber,
                        });
                }).then(Promise.reject)
                  .catch(res => {
                      expect(res.status).toEqual(409);
                  });
             });
        });

        describe('GET /api/flights', () => {
            it('should respond with a 200 and all flights if there are no errors', () => {
                return flightMock.createMany(20)
                    .then(tempFlights => {
                        return superagent.get(`${apiURL}/flights`);
                    })
                    .then(res => {
                        expect(res.status).toEqual(200);
                        expect(res.body.count).toEqual(20)
                        expect(res.body.data.length).toEqual(2);
                    });
            });

            it('should respond with a 404 not found for a bad endpoint', () => {
                return superagent.get(`${apiURL}/api/flight`)
                    .then(Promise.reject)
                    .catch(res => {
                        expect(res.status).toEqual(404);
                    });
            });
        });
});