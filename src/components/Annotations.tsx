import React from 'react';
import { AnnotationsData } from '../util/types';
import {
  ANNOTATIONS,
  DATE_OFFSET,
  EVENT_DIAMETER,
  EVENT_INNER_DIAMETER,
  EVENT_RADIUS
} from '../util/constants';

const Annotations: React.FC = () => {
  return (
    <>
      <div
        className="absolute flex justify-around w-full z-30"
        style={{
          top: `${DATE_OFFSET - EVENT_RADIUS}vh`,
        }}
      >
        <div
          className="bg-black rounded-full"
          style={{
            height: `${EVENT_DIAMETER}vh`,
            width: `${EVENT_DIAMETER}vh`,
          }}
        >
          <div
            className="bg-bone rounded-full"
            style={{
              height: `${EVENT_INNER_DIAMETER}vh`,
              width: `${EVENT_INNER_DIAMETER}vh`,
              margin: `1vh`,
            }}
          ></div>
        </div>
      </div>
      <div
        className="absolute z-30 bg-bone h-1"
        style={{
          top: `${DATE_OFFSET - .25}vh`,
          left: '50%',
          width: '10%',
        }}
      ></div>
      <div
        className="absolute text-brown-900 z-30 bg-bone px-2 py-6 rounded-b-md"
        style={{
          top: `${DATE_OFFSET - .25}vh`,
          left: '60%'
        }}
      >
        <p>Present Day</p>
      </div>
    </>
  );
};

export default Annotations;