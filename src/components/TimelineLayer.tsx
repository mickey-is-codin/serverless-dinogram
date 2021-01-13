import React from 'react';
import {
  StratumData, Delineation,
} from '../util/types';

interface TimelineLayerProps {
  data: Delineation
};
export const TimelineLayer: React.FC<TimelineLayerProps> = (props) => {
  const { data: { refs, data } } = props;
  if (!refs) return null;
  return (
    <div
      className="absolute z-20 w-1/6 mx-auto"
    >
    {data.map((stratum: StratumData, ix: number) => {
      return (
        <div
          ref={(el: HTMLDivElement | null) => refs.current[ix] = el}
          style={{ height: `${stratum.duration}vh` }}
          key={`eon-${stratum.name}-key`}
        />
      );
    })}
    </div>
  );
};