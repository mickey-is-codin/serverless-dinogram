import React from 'react';
import { useYearScroller } from '../hooks/useYearScroller';

export const CurrentYear: React.FC = () => {
  const currentYear = useYearScroller();
  const currentYearDisplay = `Years in the past: ${currentYear}`;
  return <div>{currentYearDisplay}</div>;
};