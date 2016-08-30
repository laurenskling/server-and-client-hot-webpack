const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

// production settings
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "9000";

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config = {
  context: __dirname,

  devtool: isProduction ? null : 'source-map',

  entry: []
    .concat(!isProduction && [
      'webpack/hot/poll?1000',
    ])
    .concat([
      './server/index.js',
    ])
    .filter(x => !!x),

  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: path.join(__dirname, 'build'),
    filename: 'backend.js'
  },

  externals: nodeModules,

  resolve: {
    root: [
      path.resolve(__dirname),
    ],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },

  plugins: []
    .concat([
      new webpack.NoErrorsPlugin(),
      new webpack.IgnorePlugin(/\.(css|less)$/),
      new CleanWebpackPlugin(['build'], {
        root: __dirname,
        verbose: true,
        dry: false,
        exclude: ['backend.js'],
      }),
    ])
    .concat(isProduction && [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
          HOST: JSON.stringify(HOST),
          PORT: JSON.stringify(PORT),
        },
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
    ])
    .concat(!isProduction && [
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __DEVTOOLS__: false,
      }),
      new webpack.BannerPlugin(
        'require("source-map-support").install();',
        { raw: true, entryOnly: false }
      ),
      new webpack.HotModuleReplacementPlugin(),
    ])
    .filter(x => !!x),

  module: {
		loaders: [
    	{
    		test: /\.js?$/,
    		exclude: /(node_modules|bower_components)/,
        loaders: isProduction ? ['babel'] : ['express-hot', 'babel'],
    	},
    ],
  },
};

module.exports = config;
