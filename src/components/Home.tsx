import React from 'react';
import Navbar from './Navbar';

import { gql, useQuery } from '@apollo/client';

const query = gql`
  { 
    betterHello
  }
`;

const Home = () => {

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(`Error: ${error}`);
    return <p>Error :(</p>;
  }

  const apiData = data?.betterHello;

  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-bone">Home</h1>
      <div className="text-bone">{apiData}</div>
    </>
  );
};

export default Home;