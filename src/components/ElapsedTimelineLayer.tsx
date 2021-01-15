import React from 'react';
import { DATE_OFFSET } from '../util/constants';

const ElapsedTimelineLayer: React.FC = () => {
  const top = `${DATE_OFFSET}vh`;
  return (
    <div
      className="fixed w-screen z-15 h-full"
      style={{ top }}
    >
      <div className="w-1 mx-8 sm:mx-auto h-full bg-black" />
    </div>
  );
};

export default ElapsedTimelineLayer;