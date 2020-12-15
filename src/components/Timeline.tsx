import React, { useState, useEffect, useRef, } from 'react';
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

const TimelineBody = (): JSX.Element => {
  console.log('rendering timeline body');
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

const useDelineationScrollTrigger = (
  timelineData: any, 
  timelineRefs: any, 
  enterCallbacks: any
) => {
  const { eonsData, erasData, periodsData, epochsData } = timelineData;
  const { eonRefs, eraRefs, periodRefs, epochRefs } = timelineRefs;
  const { onEonEnter, onEraEnter, onPeriodEnter, onEpochEnter } = enterCallbacks;
  useEffect(() => {
    eonRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onEonEnter(eonsData[ix].name),
        onEnterBack: onEonEnter(eonsData[ix].name),
      });
    });

    eraRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onEraEnter(erasData[ix].name),
        onEnterBack: onEraEnter(erasData[ix].name),
      });
    });

    periodRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onPeriodEnter(periodsData[ix].name),
        onEnterBack: onPeriodEnter(periodsData[ix].name),
      });
    });

    epochRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onEpochEnter(epochsData[ix].name),
        onEnterBack: onEpochEnter(epochsData[ix].name),
      });
    });
  }, [
    eonsData, eonRefs, onEonEnter,
    erasData, eraRefs, onEraEnter,
    periodsData, periodRefs, onPeriodEnter,
    epochsData, epochRefs, onEpochEnter,
  ]);
};

const CurrentTime = (props: any): JSX.Element => {
  console.log('rendering current time');

  const { timelineData, timelineRefs } = props;

  const [ currentInstant ] = useState<GeologicInstant>(toPresentInstant());

  // Move to single useState invocation
  const [ eon, setEon ] = useState(currentInstant.eon);
  const [ era, setEra ] = useState(currentInstant.era);
  const [ period, setPeriod ] = useState(currentInstant.period);
  const [ epoch, setEpoch ] = useState(currentInstant.epoch);

  useDelineationScrollTrigger(timelineData, timelineRefs, {
    onEonEnter: (data: any) => () => setEon(data),
    onEraEnter: (data: any) => () => setEra(data),
    onPeriodEnter: (data: any) => () => setPeriod(data),
    onEpochEnter: (data: any) => () => setEpoch(data),
  });

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

interface GeologicDelineationProps {
  name: string;
  data: GeologicStratum[];
  refs: any
};
const GeologicDelineation = (props: GeologicDelineationProps): JSX.Element => {
  const { name, data, refs } = props;
  console.log('rendering delineation: ', name);
  return (
    <div
      className="absolute z-20 w-1/6 mx-auto"
    >
    {data.map((stratum: GeologicStratum, ix: number) => {
      return (
        <div
          ref={el => refs.current[ix] = el}
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

const Timeline = (): JSX.Element => {
  
  console.log('rendering timeline');

  const [ timelineData ] = useState<GeologicTimeline>(toTimelineData());
  const { eons, eras, periods, epochs } = timelineData;

  // Single usestate here
  const [eonsData, setEonsData] = useState<GeologicStratum[]>([]);
  const [erasData, setErasData] = useState<GeologicStratum[]>([]);
  const [periodsData, setPeriodsData] = useState<GeologicStratum[]>([]);
  const [epochsData, setEpochsData] = useState<GeologicStratum[]>([]);

  // Concatenate to single object
  const eonRefs: any = useRef([]);
  const eraRefs: any = useRef([]);
  const periodRefs: any = useRef([]);
  const epochRefs: any = useRef([]);

  // Make this custom hook
  useEffect(() => {
    eonRefs.current = Array.from({ length: eons.length });
    eraRefs.current = Array.from({ length: eras.length });
    periodRefs.current = Array.from({ length: periods.length });
    epochRefs.current = Array.from({ length: epochs.length });
    setEonsData(eons);
    setErasData(eras);
    setPeriodsData(periods);
    setEpochsData(epochs);
  }, [eons, eras, periods, epochs]);

  return (
    <div className="text-center">
      <Navbar />
        <CurrentTime
          timelineData={{
            eonsData,
            erasData,
            periodsData,
            epochsData,
          }}
          timelineRefs={{
            eonRefs,
            eraRefs,
            periodRefs,
            epochRefs,
          }}
        />
        <h1 className="text-3xl text-bone">
          A Tour Through the Earth
        </h1>
        <TimelineStart />
        <div className="relative flex justify-center">
          <TimelineBody />
          <GeologicDelineation name="Eon" data={eonsData} refs={eonRefs} />
          <GeologicDelineation name="Era" data={erasData} refs={eraRefs} />
          <GeologicDelineation name="Period" data={periodsData} refs={periodRefs} />
          <GeologicDelineation name="Epoch" data={epochsData} refs={epochRefs} />
        </div>
    </div>
  );
};

export default Timeline;