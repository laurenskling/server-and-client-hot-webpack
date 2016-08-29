import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Home,
} from 'containers';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);

export default routes;
