const production = process.env.NODE_ENV === "production";

import path from 'path';
// we always come from a subfolder
const baseDir = path.join(__dirname, '../');

import express from 'express';
const app = express();
app.set('port', (process.env.PORT || 8000));

if (!production) {
  // start client webpack
  const config = require('../webpack.client.config');
  const webpack = require('webpack');
  const compiler = webpack(config);

  // setup the dev environment
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: { colors: true },
  }));

  // because hotloading is cool
  app.use(require('webpack-hot-middleware')(compiler));

} else {
  // production mode, ship built files
  app.use('/dist', express.static(path.join(baseDir, 'dist')));
}

// require the servers methods
let server = require('./server');
if(module.hot) {
  // decline itself, hotloading this file would start express again, giving port conflicts
  module.hot.decline();
  // hot load any changes to the server code
  module.hot.accept('./server', () => server = require('./server'));
}

// handle the POSTs
app.post('*', (req, res) => {
  server.post(req, res);
});

// handle the GETs
app.get('*', (req, res) => {
  server.get(req, res);
});


// start the server
app.listen(app.get('port'), function(err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at ${app.get('port')} with production: `, production);
});
