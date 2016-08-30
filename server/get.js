import path from 'path';
import fs from 'fs';

const baseDir = path.join(__dirname, '../');

import React from 'react';
import { renderToString } from 'react-dom/server';

import { match, RouterContext, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from 'routes';

import { Provider } from 'react-redux';
import makeStore from 'helpers/makeStore';
import Helmet from "react-helmet";

import { template } from 'lodash';
// fetch the template
const index = template(
  fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8')
);

export default (req, res, initialState={}) => {
  console.log('getting page', req.url);

  // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      render(req, res, renderProps, initialState);
    } else {
      res.status(404).send('Not found');
    }
  });
}

const render = (req, res, renderProps, initialState={}) => {
  const memoryHistory = createMemoryHistory(req.path);
  const store = makeStore(memoryHistory, initialState);
  const history = syncHistoryWithStore(memoryHistory, store);

  const head = Helmet.rewind();
  const component = renderToString(
    <Provider store={store}>
      <RouterContext
        {...renderProps}
        createElement={(Component, props) => {
          return <Component {...props} />
        }}
        />
    </Provider>
  );

  res.status(200).send(index({
    head: head,
    component: component,
    ga: ``, // add your analytics
  }));
}
