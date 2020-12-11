import React, { useState } from 'react';
import Navbar from './Navbar';

import {
  GeologicInstant,
  GeologicStratum,
  GeologicTimeline,
} from '../util/types';

import { 
  toTimelineData,
  toPresentInstant,
  EARTH_AGE_TEN_THOUSAND,
} from '../stratigraphy/geologicTimeline';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

gsap.registerPlugin(ScrollTrigger);

const TimelineStart = (): JSX.Element => {
  return (
    <div className="bg-brown-900">
      <div className="flex justify-center" >
        <div className="h-1/6 w-1/6 bg-bone text-center rounded-t-md">Present Day</div>
      </div>
    </div>
  );
};

// First refactor tomorrow
const TimelineBody = (): JSX.Element => {
  return (
    <div 
      className="absolute z-20 w-screen bg-brown-900"
      style={{ height: `460000vh` }}
    >
      <div
        className="w-1/6 mx-auto bg-bone"
        style={{ height: `${EARTH_AGE_TEN_THOUSAND}vh` }}
      >
        Base Timeline
      </div>
      <div className="bg-brown-900">
        <div className="flex justify-center" >
          <div className="h-1/6 w-1/6 bg-bone text-center rounded-b-md">Earth Formed</div>
        </div>
      </div>
    </div>
  );
};

interface CurrentTimeProps {
  currentInstant: GeologicInstant;
};

const CurrentTime = (props: CurrentTimeProps): JSX.Element => {
  const { currentInstant } = props;
  const { eon, era, period, epoch } = currentInstant;

  const eonText: string = `Eon: ${eon}`;
  const eraText: string = `Era: ${era}`;
  const periodText: string = `Period: ${period}`;
  const epochText: string = `Epoch: ${epoch}`;

  return (
    <div className="fixed text-left text-xl pt-10 px-10 left-10 text-bone z-90">
      <p>{eonText}</p>
      <p>{eraText}</p>
      <p>{periodText}</p>
      <p>{epochText}</p>
    </div>
  );
};

interface DelineationProps {
  data: GeologicStratum[];
};
const GeologicDelineation = (props: DelineationProps) => {
  const { data } = props;
  return (
    <div 
      className="absolute z-20 w-1/6 mx-auto"
    >
      {data.map((stratum) => {
        return (
          <div
            className={`bg-opacity-0`}
            style={{ height: `${stratum.duration}vh` }}
          >
          </div>
        );
      })}
    </div>
  );
};

const Timeline = (): JSX.Element => {

  const [ timelineData ] = useState<GeologicTimeline>(toTimelineData());
  const { eons, eras, periods, epochs } = timelineData;

  // Change currentInstant based on where we're scrolled
  const [ currentInstant ] = useState<GeologicInstant>(toPresentInstant());

  // Refactor timeline body before anything else tomorrow
  // TimelineEnd should go after delineations
  return (
    <div className="text-center">
      <Navbar />
        <CurrentTime currentInstant={currentInstant} />
        <h1 className="text-3xl text-bone">
          A Tour Through the Earth
        </h1>
        <TimelineStart />
        <div className="relative flex justify-center">
          <TimelineBody />
          <GeologicDelineation data={eons} />
          <GeologicDelineation data={eras} />
          <GeologicDelineation data={periods} />
          <GeologicDelineation data={epochs} />
        </div>
    </div>
  );
};

export default Timeline;