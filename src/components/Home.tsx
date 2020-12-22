import React from 'react';
import Navbar from './Navbar';
import PageText from './PageText';
import textBlocks from '../text/home';
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
      <div>
        <div className="flex justify-around">
          <div className="w-1/5"></div>
          <div className="w-3/5">
            <h1 className="text-3xl text-bone">Home</h1>
            <PageText 
              name="home"
              textBlocks={textBlocks}
              baseClasses="text-bone my-8"
            />
          </div>
          <div className="w-1/5"></div>
        </div>
      </div>
    </>
  );
};

export default Home;