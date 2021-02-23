import React from 'react';
import Navbar from '../../components/Navbar';
import PageText from '../../components/PageText';
import textBlocks from '../../text/home';
import { PageNames } from '../../util/types';

const Home: React.FC = () => {

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
          </div>
          <div className="w-1/5"></div>
        </div>
      </div>
    </>
  );
};

export default Home;