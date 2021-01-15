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
    <div className="fixed text-left text-xl pt-10 px-10 left-0 text-bone z-90">
      <CurrentYear />
      <CurrentTime timeline={timeline} />
    </div>
  )
};

export default TimeSidebar;