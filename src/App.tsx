import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import People from './components/People';
import About from './components/Home';
import './App.css';

import { 
  gql, 
  useQuery, 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import config from './aws-exports';

const [{ endpoint }] = config.aws_cloud_logic_custom;

const query = gql`
  { 
    betterHello
  }
`;

const App = () => {

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(`Error: ${error}`);
    return <p>Error :(</p>;
  }

  return (
    <div>{data?.betterHello}</div>
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
    <Navbar />
    <Home />
    <Timeline />
    <People />
    <About />
  </ApolloProvider>
);

export default AppWithProvider;
