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
    <div className="time-sidebar">
      <CurrentYear />
      <CurrentTime timeline={timeline} />
    </div>
  )
};

export default TimeSidebar;