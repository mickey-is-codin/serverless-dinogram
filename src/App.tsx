import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import Home from './components/Home';
// import Timeline from './components/Timeline';
// import People from './components/People';
// import About from './components/About';
import homeRoutes from './pages/root';

import './styles/tailwind.output.css';

import {
  ApolloClient, 
  InMemoryCache, 
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import config from './aws-exports';
const [{ endpoint }] = config.aws_cloud_logic_custom;

// const Home = lazy(() => import('./pages/root/Home'));

const App: React.FC = () => {

  const homeRouteMap: any = homeRoutes.reduce((acc, { route, componentPath }) => {
    console.log(`./pages/root/${componentPath}`);
    return {
      ...acc,
      [route]: lazy(() => import(`./pages/root/${componentPath}`))
    };
  }, {});

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
            {/* <Route exact path="/"><Home /></Route>
            <Route path="/timeline"><Timeline /></Route>
            <Route path="/people"><People /></Route>
            <Route path="/about"><About /></Route> */}
            {/* <Route component={NotFound}></Route> */}
            {homeRoutes.map(({ route }) => {
              console.log('route: ', route);
              console.log('component: ', homeRouteMap[route]);
              // console.log('about component: ', About);
              return (
                <Route
                  key={`route-${route}`}
                  exact
                  path={`/${route}`}
                  component={homeRouteMap[route]}
                />
              );
            })}
            {/* <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/" component={Home}></Route>
            </Suspense> */}
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
