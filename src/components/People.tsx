import React from 'react';
import Navbar from './Navbar';
import text from '../text/people';
import { PageNames } from '../util/types';

const People: React.FC = () => {
  return (
    <>
      <Navbar pageName={PageNames.People} />
      <h1 className="text-3xl text-bone text-center">People</h1>
      <p className="text-bone">{text}</p>
    </>
  );
};

export default People;