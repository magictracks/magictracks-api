/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
// const server = app.listen(port);

// https
const fs = require('fs');
const https  = require('https');

// https server
const server = https.createServer({
  key: fs.readFileSync('config/key_magictracks.pem'),
  cert: fs.readFileSync('config/certificate_magictracks.pem')
}, app).listen(port);

// Call app.setup to initialize all services and SocketIO
app.setup(server);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
