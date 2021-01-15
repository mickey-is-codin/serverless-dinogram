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
      className="fixed right-0 text-center my-16 mx-4 px-4 text-bone z-80 bg-brown-900 rounded-md"
    >
      <CurrentYear />
      <CurrentTime timeline={timeline} />
    </div>
  )
};

export default TimeSidebar;