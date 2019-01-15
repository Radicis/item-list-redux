import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import ItemDisplay from './containers/ItemDisplay';

export default () => (
  <App>
    <Switch>
      <Route path={routes.MAIN} component={ItemDisplay} />
    </Switch>
  </App>
);
