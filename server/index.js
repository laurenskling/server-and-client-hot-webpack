if (process.env.NODE_MONEY) {
  const monkey = require('node-monkey')({});
  monkey.attachConsole();
}

const production = process.env.NODE_ENV === "production";

import path from 'path';
// we always come from a subfolder
const baseDir = path.join(__dirname, '../');

import express from 'express';
const app = module.exports = express();

// set a port
app.set('port', (process.env.PORT || 8000));

// load the routes
require('./routes')(app);
if(module.hot) {
  module.hot.accept('./routes', () => require('./routes')(app));
}

// start the server, via http for express-hot
import http from 'http';
http.createServer(app).listen(app.get('port'), function(err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at ${app.get('port')} with production: `, production);
});
