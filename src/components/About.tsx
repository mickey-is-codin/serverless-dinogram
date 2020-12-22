import React from 'react';
import Navbar from './Navbar';
import PageText from './PageText'
import textBlocks from '../text/about';
import { PageNames } from '../util/types';

const About: React.FC = () => {
  return (
    <>
      <Navbar pageName={PageNames.About} />
      <div>
        <div className="flex justify-around">
          <div className="w-1/5"></div>
          <div className="w-3/5">
            <h1 className="text-3xl text-bone">About</h1>
            <h1 className="text-2xl text-bone">For anyone curious...</h1>
            <PageText 
              name="about"
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

export default About;