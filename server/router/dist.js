import express from 'express';

module.exports = (app) => {
  // production mode, ship built files
  app.use('/dist', express.static('dist'));
};
