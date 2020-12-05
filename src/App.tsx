import React from 'react';
import logo from './logo.svg';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{data?.betterHello}</h1>
      </header>
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
