import React from 'react';
import Navbar from './Navbar';
import PageText from './PageText';
import textBlocks from '../text/people';
import { PageNames } from '../util/types';

const People: React.FC = () => {
  return (
    <>
      <Navbar pageName={PageNames.People} />
      <div>
        <div className="flex justify-around">
          <div className="w-1/5"></div>
          <div className="w-3/5">
            <h1 className="text-3xl text-bone">People</h1>
            <h1 className="text-2xl text-bone">Coming soon...</h1>
            <PageText 
              name="people"
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

export default People;