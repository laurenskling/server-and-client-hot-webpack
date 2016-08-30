const production = process.env.NODE_ENV === "production";

module.exports = function(app) {

  if (!production) {
    require('./router/webpack')(app);
  } else {
    require('./router/dist')(app);
  }

  // application routing
  require('./router/app')(app);

};

if(module.hot) {
  const app = ['./router/app'];
  module.hot.accept(app, () => {
    try {
      require('./router/app');
    }
    catch(e) {
      console.error(e);
    }
  });
}
