import React from 'react';
import {
  GeologicStratum, GeologicValueRefTuple,
} from '../util/types';

interface GeologicDelineationProps {
  name: string;
  valueRefs: GeologicValueRefTuple;
};
export const GeologicDelineation: React.FC<GeologicDelineationProps> = (props) => {
  const { name, valueRefs } = props;
  const [data, refs] = valueRefs;
  return (
    <div
      className="absolute z-20 w-1/6 mx-auto"
    >
    {data.map((stratum: GeologicStratum, ix: number) => {
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