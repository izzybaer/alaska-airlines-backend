'use strict';

module.exports = (err, req, res, next) => {
    
    let message = err.message.toLowerCase();

    if(message.includes('objectid failed')) {
        console.log('objectid failed: responding with a 404 status code');
        return res.sendStatus(404);
    }

    if(message.includes('validation failed')) {
        console.log('validation failed: responding with a 400 status code');
        return res.sendStatus(400);
    }

    if(message.includes('duplicate key')) {
        console.log('duplicate key: responding with a 409 status code');
        return res.sendStatus(409);
    }

    if(message.includes('unauthorized')) {
        console.log('unauthorized: responding with a 401 status code');
        return res.sendStatus(401);
    }

    return res.sendStatus(500);
};