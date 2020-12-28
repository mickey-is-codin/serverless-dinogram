import React from 'react';
import { useYearScroller } from '../util/hooks';

export const CurrentYear: React.FC = () => {

  const currentYear = useYearScroller();
  const currentYearDisplay = `Years in the past: ${currentYear}`;

  return (
    <div className="fixed text-right text-xl pt-10 px-10 right-0 text-bone z-90">
      {currentYearDisplay}
    </div>
  );
};