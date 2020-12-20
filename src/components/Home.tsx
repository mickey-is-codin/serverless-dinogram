import React from 'react';
import Navbar from './Navbar';
import text from '../text/home';
import { PageNames, ApolloResponse } from '../util/types';

import { gql, useQuery } from '@apollo/client';

const query = gql`
  { 
    betterHello
  }
`;

const Home: React.FC = () => {

  const { loading, error, data } = useQuery<ApolloResponse>(query);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(`Error: ${error}`);
    return <p>Error :(</p>;
  }

  const apiData: string | undefined = data?.betterHello;
  console.log('apiData: ', apiData);

  return (
    <>
      <Navbar pageName={PageNames.Home} />
      <div className="text-center">
        <h1 className="text-3xl text-bone">Home</h1>
        <p className="text-bone">{text}</p>
      </div>
    </>
  );
};

export default Home;