import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ActivityIndicator } from 'zarm';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './stores';
import routes from './Routes';

const Routes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<ActivityIndicator />}>
          <Switch>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} exact={route.exact} component={route.component} />
            ))}
            <Route render={() => <div>page not found</div>} />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
};

export default Routes;
