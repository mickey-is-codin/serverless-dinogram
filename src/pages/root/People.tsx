import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageText from '../../components/PageText';
import textBlocks from '../../text/people';
import { PageNames } from '../../util/types';

const People: React.FC = () => {
  return (
    <PageContainer pageName={PageNames.People}>
      <h1 className="text-3xl text-bone">People</h1>
      <h1 className="text-2xl text-bone">Coming soon...</h1>
      <PageText 
        name="people"
        textBlocks={textBlocks}
        baseClasses="text-bone my-8"
      />
    </PageContainer>
  );
};

export default People;