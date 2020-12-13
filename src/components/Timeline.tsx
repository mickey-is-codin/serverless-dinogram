import React, { useState, useEffect, useRef, useCallback } from 'react';
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

interface GeologicDelineationProps {
  name: string;
  data: GeologicStratum[];
  refs: any
};
const GeologicDelineation = (props: GeologicDelineationProps): JSX.Element => {
  const { name, data, refs } = props;
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

const toScrollTriggerCallbacks = (data: any, refs: any) => (onEnter: any, onLeave: any, onEnterBack: any, onLeaveBack: any) => {
  useEffect(() => {
    if (!data.length) return;
    refs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onEnter(data[ix]),
        onLeave: onLeave(data[ix]),
        onEnterBack: onEnterBack(data[ix]),
        onLeaveBack: onLeaveBack(data[ix]),
      });
    });
  }, [onEnter, onLeave, onEnterBack, onLeaveBack]);
};

const Timeline = (): JSX.Element => {

  const [ currentInstant, setCurrentInstant ] = useState<GeologicInstant>(toPresentInstant());
  const onUpdateInstant = useCallback((value) => {
    setCurrentInstant(value);
  }, [setCurrentInstant]);

  const [ timelineData ] = useState<GeologicTimeline>(toTimelineData());
  const { eons, eras, periods, epochs } = timelineData;

  const [eonsData, setEonsData] = useState<GeologicStratum[]>([]);
  const [erasData, setErasData] = useState<GeologicStratum[]>([]);
  const [periodsData, setPeriodsData] = useState<GeologicStratum[]>([]);
  const [epochsData, setEpochsData] = useState<GeologicStratum[]>([]);

  const eonRefs: any = useRef([]);
  const eraRefs: any = useRef([]);
  const periodRefs: any = useRef([]);
  const epochRefs: any = useRef([]);

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

  // ScrollTrigger useEffect
  // Make custom hook for this shite
  // toScrollTriggerCallbacks(eonsData, eonRefs)(() => {}, () => {});
  // toScrollTriggerCallbacks(erasData, eraRefs)(() => {}, () => {});
  // toScrollTriggerCallbacks(periodsData, periodRefs)(() => {}, () => {});
  toScrollTriggerCallbacks(epochsData, epochRefs)(
    (stratum: any) => () => console.log(`Entered epoch: ${stratum.name}`),
    (stratum: any) => () => console.log(`Left epoch: ${stratum.name}`),
    (stratum: any) => () => console.log(`Entered epoch: ${stratum.name}`),
    (stratum: any) => () => console.log(`Left epoch: ${stratum.name}`),
  );

  // useEffect(() => {
  //   if (!erasData.length) return;
  //   eraRefs.current.forEach((eraRef: any, ix: any) => {
  //     ScrollTrigger.create({
  //       trigger: eraRef,
  //       // onEnter: () => console.log(`Entered eras: ${erasData[ix].name}`),
  //       // onLeave: () => console.log(`Left eras: ${erasData[ix].name}`),
  //       onEnter: () => {},
  //       onLeave: () => {},
  //     });
  //   });
  // }, [erasData]);

  // useEffect(() => {
  //   if (!periodsData.length) return;
  //   periodRefs.current.forEach((periodRef: any, ix: any) => {
  //     ScrollTrigger.create({
  //       trigger: periodRef,
  //       // onEnter: () => console.log(`Entered period: ${periodsData[ix].name}`),
  //       // onLeave: () => console.log(`Left period: ${periodsData[ix].name}`),
  //       onEnter: () => {},
  //       onLeave: () => {},
  //     });
  //   });
  // }, [periodsData]);

  // useEffect(() => {
  //   if (!epochsData.length) return;
  //   epochRefs.current.forEach((epochRef: any, ix: any) => {
  //     ScrollTrigger.create({
  //       trigger: epochRef,
        // start: 'top 165px',
        // end: 'bottom 165px',
  //       onEnter: () => console.log(`Entered epoch: ${epochsData[ix].name}`),
  //       onLeave: () => console.log(`Left epoch: ${epochsData[ix].name}`),
  //       markers: true
  //     });
  //   });
  // }, [epochsData]);

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
          <GeologicDelineation name="Eon" data={eonsData} refs={eonRefs} />
          <GeologicDelineation name="Era" data={erasData} refs={eraRefs} />
          <GeologicDelineation name="Period" data={periodsData} refs={periodRefs} />
          <GeologicDelineation name="Epoch" data={epochsData} refs={epochRefs} />
        </div>
    </div>
  );
};

export default Timeline;