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
    <div className="fixed text-left text-xl pt-10 px-10 left-0 text-bone z-90">
      <CurrentYear />
      <CurrentTime strata={strata} />
    </div>
  )
};

export default TimeSidebar;