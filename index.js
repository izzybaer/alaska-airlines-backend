'use strict'

require('dotenv').config()
require('babel-register')
let server = require('./src/lib/server')

server.start()