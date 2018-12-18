/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');

const server = app.listen(port);

const bankai = require('bankai/http')
const http = require('http')
const path = require('path')
const compiler = bankai(path.join(__dirname, '../client/index.js'))

const clientServer = http.createServer(function (req, res) {
  compiler(req, res, function () {
    res.statusCode = 404
    res.end('not found')
  })
})

clientServer.listen(3031, function () {
    console.log('Choo application started on http://%s:%d', app.get('host'), 3031)
  })

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
