import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageText from '../../components/PageText';
import textBlocks from '../../text/home';
import { PageNames } from '../../util/types';

const Home: React.FC = () => {
  return (
    <PageContainer pageName={PageNames.Home}>
      <h1 className="text-3xl text-bone">The Dinogram</h1>
        <h1 className="text-2xl text-bone">
          Everyone's favorite sometimes weekly dinosaur newsletter!
        </h1>
        <PageText 
          name="home"
          textBlocks={textBlocks}
          baseClasses="text-bone my-8"
        />
    </PageContainer>
  );
};

export default Home;