'use strict'

require('./lib/setup');

import faker from 'faker';
import mongoose from 'mongoose';
import httpError from 'http-errors'
import server from '../lib/server';
import superagent from 'superagent';
import Flight from '../model/flight';
import flightMock from './lib/flight-mock';

const apiURL = `http://localhost:${process.env.PORT}`;


describe('/api/flights', () => {
    beforeAll(server.start);
    afterAll(() => {
        flightMock.cleanDB()
         .then(server.stop);
});

    describe('POST /api/flights', () => {
        it('should respond with a 200 and a flight if there are no errors', () => {
            return superagent.post(`${apiURL}/api/flights`)
                .send(flightMock.flight)
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
                            FlightNumber: 1001
                        });
                })
                .then(res => expect(res.status).toEqual(409))
                .catch(err => new httpError(err.status, err.message));
             });
        });

        describe('GET /api/flights', () => {
            it('should respond with a 200 and all flights if there are no errors', () => {
                return superagent.get(`${apiURL}/flights`)
                    .then(res => {
                        expect(res.status).toEqual(200);
                        expect(res.body.count).toEqual(20)
                        expect(res.body.data.length).toEqual(2);
                    })
                    .catch(err => new httpError(err.status, err.message));
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