'use strict';

import logger from './logger';

module.exports = (req, res, next) => {
    logger.log('info', `processing: ${req.method} on: ${req.url} returned: ${res}`);
    console.log(`processing: ${req.method} on: ${req.url}`);
    return next();
}