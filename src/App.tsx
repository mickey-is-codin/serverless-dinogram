import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import { RouteMap } from './util/types';
// import homeRoutes from './pages/root';
// import { toHomeRouteMap } from './util/routeMapping';
import Timeline from './pages/root/Timeline';
import About from './pages/root/About';
import People from './pages/root/People';
import Contact from './pages/root/Contact';

import './styles/tailwind.output.css';

import {
  ApolloClient, 
  InMemoryCache, 
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import config from './aws-exports';

const [{ endpoint }] = config.aws_cloud_logic_custom;

// const homeRouteMap: RouteMap = toHomeRouteMap(homeRoutes);

const App: React.FC = () => {

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url("/img/dirt_bg_1.jpg")` ,
      }}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* {homeRoutes.map(({ route }) => {
              return (
                <Route
                  key={`route-${route}`}
                  exact={route !== '/'}
                  path={`/${route}`}
                  component={homeRouteMap[route]}
                />
              );
            })} */}
            <Route component={Timeline} path="/" exact />
            <Route component={About} path="/about" />
            <Route component={People} path="/people" />
            <Route component={Contact} path="/contact" />
            <Route path="*">
              <div>No match</div>
            </Route>
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
