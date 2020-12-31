import React from 'react';
import { EARTH_AGE_TEN_THOUSAND } from '../util/geologicTimeline';

export const TimelineStart: React.FC = () => {
  return (
    <div className="bg-brown-900">
      <div className="flex justify-center" >
        <div className="h-1/6 w-2/6 bg-bone text-center rounded-t-md">Present Day</div>
      </div>
    </div>
  );
};

export const TimelineBody: React.FC = () => {
  return (
    <div 
      className="absolute z-20 w-screen bg-brown-900"
      style={{ height: `460000vh` }}
    >
      <div
        className="w-2/6 mx-auto bg-bone"
        style={{ height: `${EARTH_AGE_TEN_THOUSAND}vh` }}
      >
        Base Timeline
      </div>
      <div className="bg-brown-900">
        <div className="flex justify-center" >
          <div className="h-1/6 w-2/6 bg-bone text-center rounded-b-md">Earth Formed</div>
        </div>
      </div>
    </div>
  );
};