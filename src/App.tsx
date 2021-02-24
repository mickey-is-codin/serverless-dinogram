import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { RouteMap } from './util/types';
import homeRoutes from './pages/root';
import { toHomeRouteMap } from './util/routeMapping';

import './styles/tailwind.output.css';

import {
  ApolloClient, 
  InMemoryCache, 
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import config from './aws-exports';

const [{ endpoint }] = config.aws_cloud_logic_custom;

const App: React.FC = () => {

  const homeRouteMap: RouteMap = toHomeRouteMap(homeRoutes);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url("img/dirt_bg_1.jpg")` ,
      }}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {homeRoutes.map(({ route }) => {
              return (
                <Route
                  key={`route-${route}`}
                  exact
                  path={`/${route}`}
                  component={homeRouteMap[route]}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: endpoint + '/graphql',
});

const client = new ApolloClient({
  cache,
  link,
});

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default AppWithProvider;
