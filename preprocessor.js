require('babel-register');

// safety settings for running SSR React code
global.__DEVELOPMENT__ = false;
global.__DEVTOOLS__ = false;

require('./server/index');
