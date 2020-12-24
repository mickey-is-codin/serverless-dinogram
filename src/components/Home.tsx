import React from 'react';
import Navbar from './Navbar';
import PageText from './PageText';
import textBlocks from '../text/home';
import { PageNames, ApolloResponse } from '../util/types';

import { gql, useQuery } from '@apollo/client';

const query = gql`
  { 
    campaignList,
    campaignHtml(id: "this is the id im sending"),
  }
`;

const ApiStuff = () => {
  const { loading, error, data } = useQuery<ApolloResponse>(query);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(`Error: ${error}`);
    return <p>Error :(</p>;
  }

  const campaignListResponse = data?.campaignList as string;
  const campaignList = JSON.parse(campaignListResponse);

  const campaignHtmlResponse = data?.campaignHtml as string;
  const campaignHtml = JSON.parse(campaignHtmlResponse);

  console.log('campaignList: ', campaignList);
  console.log('campaignHtml: ', campaignHtml);

  return (
    <>
      {`API Stuff`}
    </>
  );
};

const Home: React.FC = () => {

  // TODO: Something like a Page component
  return (
    <>
      <Navbar pageName={PageNames.Home} />
      <div>
        <div className="flex justify-around">
          <div className="w-1/5"></div>
          <div className="w-3/5">
            <h1 className="text-3xl text-bone">The Dinogram</h1>
            <h1 className="text-2xl text-bone">
              Everyone's favorite sometimes weekly dinosaur newsletter!
            </h1>
            <PageText 
              name="home"
              textBlocks={textBlocks}
              baseClasses="text-bone my-8"
            />
            <ApiStuff />
          </div>
          <div className="w-1/5"></div>
        </div>
      </div>
    </>
  );
};

export default Home;