'use strict';

import getCSV from 'get-csv';

getCSV('airports.csv', (err, data))
    .then(rows => console.log(rows))
    .then(() => next())
    .catch(next)