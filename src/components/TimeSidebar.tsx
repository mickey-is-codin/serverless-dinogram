import React from 'react';
import { CurrentTime, CurrentYear } from './TimeReadouts';

const TimeSidebar: React.FC = () => {
  return (
    <div
      className="fixed right-0 sm:text-xl sm:left-0 sm:w-64 text-center my-16 sm:my-0 mx-4 sm:mx-16 px-4 text-bone z-80 bg-brown-900 rounded-md"
    >
      <CurrentYear />
      <CurrentTime />
    </div>
  )
};

export default TimeSidebar;