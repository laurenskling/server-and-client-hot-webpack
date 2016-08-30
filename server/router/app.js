// // require the servers methods
const server = require('../server');

module.exports = (app) => {

  // handle the POSTs
  app.post('*', (req, res) => {
    server.post(req, res);
  });

  // handle a test page
  app.get('/test', (req, res) => {
    // without this route, express-hot doesn't really understand how to update *
    console.log('getting test!');
    server.get(req, res);
  });


  // handle the GETs
  app.get('*', (req, res) => {
    console.log('get *');
    server.get(req, res);
  });

};
