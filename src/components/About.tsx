import React from 'react';
import Navbar from './Navbar';
import text from '../text/about';
import { PageNames } from '../util/types';

const About: React.FC = () => {
  return (
    <>
      <Navbar pageName={PageNames.About} />
      <h1 className="text-3xl text-bone text-center">About</h1>
      <p className="text-bone">{text}</p>
    </>
  );
};

export default About;