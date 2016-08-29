"use strict";

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackStrip = require('strip-loader');

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "8000";

// Build gets called from root, Server comes from subfolder
const baseDir = process.env.BUILD ? __dirname : path.join(__dirname, '..');

const config = {
  context: baseDir,

	entry: []
    .concat(!isProduction && [
      `webpack-hot-middleware/client?reload=true`,
      `react-hot-loader/patch`,
    ])
    .concat(isProduction && [
      'babel-polyfill',
    ])
    .concat([
      path.join(baseDir, 'src', 'index.js'),
    ])
    .filter(x => !!x),

	devtool: isProduction ? null : 'source-map',

	output: {
		path: path.join(baseDir, 'dist'),
    publicPath: `http://${HOST}:${PORT}/dist/`,
    filename: 'bundle.js',
	},

	resolve: {
		root: [
			path.resolve(baseDir, 'src'),
		],
		extensions: ['', '.js'],
	},

	module: {
		loaders: [
    	{
    		test: /\.scss$/,
        loader: isProduction ? ExtractTextPlugin.extract('css!sass') : undefined,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"],
    	},
    	{
    		test: /\.jsx?$/,
    		exclude: /(node_modules|bower_components)/,
    		loaders: isProduction
          ? ['babel', WebpackStrip.loader('console.log', 'console.info', 'console.warn')]
          : ['babel'],
    	},
    	{ test: /\.css$/, loader: 'style!css' },
    	{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    	{ test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
    	{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    	{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    	{ test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
    	{ test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
    	{ test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
      { test: /\.json$/, loader: 'json' },
    ],
	},

	plugins: [
  		new webpack.NoErrorsPlugin(),
  		new CopyWebpackPlugin([
  			{ from: './index.html' },
  		]),

  	].concat(!isProduction && [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
      }),

    ]).concat(isProduction && [
  		new ExtractTextPlugin('styles.css'),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false,
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),

  	]).filter(x => !!x),
};

module.exports = config;
