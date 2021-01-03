import React from 'react';
import { Strata } from '../util/types';
import { CurrentTime } from './CurrentTime';
import { CurrentYear } from './CurrentYear';

interface TimeSidebarProps {
  strata: Strata;
};
const TimeSidebar: React.FC<TimeSidebarProps> = (props) => {
  const { strata } = props;
  return (
    <div className="time-sidebar">
      <CurrentYear />
      <CurrentTime strata={strata} />
    </div>
  )
};

export default TimeSidebar;