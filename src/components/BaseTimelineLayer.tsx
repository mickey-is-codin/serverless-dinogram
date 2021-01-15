import React from 'react';
import { DATE_OFFSET, EARTH_AGE_TEN_THOUSAND, TIMELINE_START_HEIGHT } from '../util/constants';

const BaseTimelineLayer: React.FC = () => {
  const height = `${EARTH_AGE_TEN_THOUSAND + DATE_OFFSET + 30}vh`;
  return (
    <div 
      className="absolute w-screen z-0"
      style={{ 
        height,
        top: `${TIMELINE_START_HEIGHT}vh`,
        backgroundImage: `url("img/dirt_bg_1.jpg")`,
      }}
    >
      <div
        className="w-1 bg-bone z-0 mx-8"
        style={{
          height,
          top: `${TIMELINE_START_HEIGHT}vh`,
        }}
      >
      </div>
    </div>
  );
};

export default BaseTimelineLayer;