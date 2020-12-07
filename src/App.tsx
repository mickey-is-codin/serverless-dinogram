import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Timeline from './components/Timeline';
import People from './components/People';
import About from './components/About';

import './styles/tailwind.output.css';

import {
  // gql, 
  // useQuery, 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import config from './aws-exports';

const [{ endpoint }] = config.aws_cloud_logic_custom;

// const query = gql`
//   { 
//     betterHello
//   }
// `;

const App = () => {

  // const { loading, error, data } = useQuery(query);

  // if (loading) return <p>Loading...</p>;
  // if (error) {
  //   console.log(`Error: ${error}`);
  //   return <p>Error :(</p>;
  // }

  // const apiData = data?.betterHello;

  return (
    <div className="background">
      <Router>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/timeline"><Timeline /></Route>
          <Route path="/people"><People /></Route>
          <Route path="/about"><About /></Route>
          {/* <Route component={NotFound}></Route> */}
        </Switch>
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
