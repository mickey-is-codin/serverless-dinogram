import React from 'react';
import { GeologicTimeline } from '../util/types';
import { CurrentTime } from './CurrentTime';
import { CurrentYear } from './CurrentYear';

interface TimeSidebarProps {
  timeline: GeologicTimeline;
};
const TimeSidebar: React.FC<TimeSidebarProps> = (props) => {
  const { timeline } = props;
  return (
    <div
      className="fixed right-0 sm:text-xl sm:left-0 sm:w-64 text-center my-16 sm:my-0 mx-4 sm:mx-16 px-4 text-bone z-80 bg-brown-900 rounded-md"
    >
      <CurrentYear />
      <CurrentTime timeline={timeline} />
    </div>
  )
};

export default TimeSidebar;