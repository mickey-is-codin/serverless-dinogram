import React from 'react';
import PageContainer from '../../components/PageContainer';
import PageText from '../../components/PageText'
import textBlocks from '../../text/about';
import { PageNames } from '../../util/types';

const About: React.FC = () => {
  return (
    <PageContainer pageName={PageNames.ABOUT}>
      <h1 className="text-3xl text-bone">About</h1>
      <h1 className="text-2xl text-bone">For anyone curious...</h1>
      <PageText 
        name="about"
        textBlocks={textBlocks}
        baseClasses="text-bone my-8"
      />
    </PageContainer>
  );
};

export default About;