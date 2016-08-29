require('babel-register');

// safety settings for running SSR React code
global.__DEVELOPMENT__ = false;
global.__DEVTOOLS__ = false;

if (process.env.NODE_MONEY) {
  const monkey = require('node-monkey')({});
  monkey.attachConsole();
}

require('./server/index');
