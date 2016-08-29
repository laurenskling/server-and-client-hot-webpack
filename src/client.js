import React from 'react';

import { Provider } from 'react-redux';
import makeStore from 'helpers/makeStore';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from 'routes';

const store = makeStore(browserHistory, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
    </Provider>
  );
}

export default Root;
