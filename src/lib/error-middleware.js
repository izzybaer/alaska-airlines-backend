'use strict';

import logger from './logger';

module.exports = (err, req, res, next) => {
    
    logger.log('info', '__ERROR_MIDDLEWARE__');
    logger.log('info', err);
    
    if(err.status) {
        logger.log('info', `responding with a ${err.status} status and ${err.message}`);
        return res.sendStatus(err.status);
    };

    let message = err.message.toLowerCase();

    if(message.includes('objectid failed')) {
        logger.log('info', `objectid failed: responding with a 404 status code`);
        return res.sendStatus(404);
    }

    if(message.includes('validation failed')) {
        logger.log('info', `validation failed: responding with a 400 status code`);
        return res.sendStatus(400);
    }

    if(message.includes('duplicate key')) {
        logger.log('info', `duplicate key error: responding with a 409 status code`);
        return res.sendStatus(409);
    }

    if(message.includes('duplicate key')) {
        logger.log('info', `duplicate key error: responding with a 409 status code`);
        return res.sendStatus(409);
    }

    if(message.includes('unauthorized')) {
        logger.log('info', `unauthorized: responding with a 401 status code`);
        return res.sendStatus(401);
    }

    logger.log('info', 'responding with a 500 status code');
    logger.log('info', err);
    return res.sendStatus(500);
};