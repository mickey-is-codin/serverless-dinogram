import React from 'react';
import { GeologicTimeline } from '../util/types';
import { CurrentTime } from './CurrentTime';
import { CurrentYear } from './CurrentYear';

interface TimeSidebarProps {
  data: GeologicTimeline;
};
const TimeSidebar: React.FC<TimeSidebarProps> = (props) => {
  const { data } = props;
  return (
    <div className="time-sidebar">
      <CurrentYear />
      <CurrentTime data={data} />
    </div>
  )
};

export default TimeSidebar;