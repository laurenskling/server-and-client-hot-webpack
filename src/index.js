import { render } from 'react-dom';
import React from 'react';

import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';

const renderApp = () => {
  const Client = require('./client').default;
  render(
    module.hot ? <AppContainer errorReporter={Redbox}><Client /></AppContainer> : <Client />,
    document.querySelector('#root'),
  );
}

if (module.hot) {
  module.hot.accept('client', () => {
    renderApp();
  });
}

renderApp();
