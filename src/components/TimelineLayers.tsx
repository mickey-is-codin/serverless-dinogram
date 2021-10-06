import React from 'react';
import { 
  DATE_OFFSET,
  EARTH_AGE_TEN_THOUSAND,
  TIMELINE_START_HEIGHT
} from '../util/constants';
import {
  Stratum,
  Delineation,
} from '../util/types';

export const BaseTimelineLayer: React.FC = () => {
  const height = `${EARTH_AGE_TEN_THOUSAND + DATE_OFFSET + 30}vh`;
  return (
    <div 
      className="absolute w-screen z-0"
      style={{ 
        height,
        backgroundImage: `url("img/dirt_bg_1.jpg")`,
      }}
    >
      <div
        className="w-1 bg-bone z-0 mx-8 sm:mx-auto"
        style={{
          height,
          top: `${TIMELINE_START_HEIGHT}vh`,
        }}
      >
      </div>
    </div>
  );
};

export const ElapsedTimelineLayer: React.FC = () => {
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

interface TimelineLayerProps {
  data: Delineation
};
export const TimelineLayer: React.FC<TimelineLayerProps> = (props) => {
  const { data: { strata } } = props;
  return (
    <div
      className="absolute z-20 w-1/6 mx-auto"
    >
    {strata.map((stratum: Stratum, ix: number) => {
      const { name, duration, ref } = stratum;
      return (
        <div
          ref={(el: HTMLDivElement) => ref.current = el}
          style={{ height: `${duration}vh` }}
          key={`eon-${name}-key`}
        />
      );
    })}
    </div>
  );
};
