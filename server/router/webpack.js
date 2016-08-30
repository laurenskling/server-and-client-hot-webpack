module.exports = (app) => {
  // start client webpack
  const config = require('../../webpack.client.config');
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
};
