import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from 'reducers';

const makeStore = (history, initialState = {}) => {
  const middleware = []
    .concat(history && [ routerMiddleware(history)] )
    .filter(x => !!x);

  const composers = []
    .concat(
        __DEVTOOLS__ // if devtools is set in webpack
        && typeof window !== 'undefined' // if we are on the frontend
        && window.devToolsExtension // if the Chrome plugin exists
        && [ window.devToolsExtension() ]
    )
    .filter(x => !!x);

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        ...middleware,
      ),
      ...composers,
    ),
  );
}

export default makeStore;
