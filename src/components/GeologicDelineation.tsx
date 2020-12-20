import React from 'react';
import {
  StratumData, Stratum,
} from '../util/types';

interface GeologicDelineationProps {
  stratum: Stratum
};
export const GeologicDelineation: React.FC<GeologicDelineationProps> = (props) => {
  const { stratum: { name, refs, strata: data } } = props;
  return (
    <div
      className="absolute z-20 w-1/6 mx-auto"
    >
    {data.map((stratum: StratumData, ix: number) => {
      return (
        <div
          ref={(el: HTMLDivElement | null) => refs.current[ix] = el}
          // className={`bg-opacity-0`}
          className={`bg-red-${ix+1}00`}
          style={{ height: `${stratum.duration}vh` }}
          key={`eon-${stratum.name}-key`}
        >
          {`${name}: ${stratum.name}`}
        </div>
      );
    })}
    </div>
  );
};