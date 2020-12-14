import React, { useState, useEffect, useRef, useCallback, } from 'react';
import Navbar from './Navbar';
import { noop } from '../util/fp';

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

const CurrentTime = (props: any): JSX.Element => {
  console.log('rendering current time');

  const { timelineData, timelineRefs } = props;

  const { epochsData } = timelineData;
  const { epochRefs } = timelineRefs;

  const [ currentInstant, setCurrentInstant ] = useState<GeologicInstant>(toPresentInstant());

  const [ eon, setEon ] = useState(currentInstant.eon);
  const [ era, setEra ] = useState(currentInstant.era);
  const [ period, setPeriod ] = useState(currentInstant.period);
  const [ epoch, setEpoch ] = useState(currentInstant.epoch);

  console.log('epoch: ', epoch);

  const onUpdateCurrentInstant = useCallback((newInstant) => {
    setCurrentInstant(newInstant);
  }, [setCurrentInstant]);

  useEffect(() => {
    if (!epochsData.length) return;
    epochRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: () => setEpoch(epochsData[ix].name),
        // onEnter: onUpdateCurrentInstant(epochsData[ix].name),
        // onEnter: () => console.log('entering top'),
        onLeave: noop,
        onEnterBack: () => setEpoch(epochsData[ix].name),
        // onEnterBack: onUpdateCurrentInstant(epochsData[ix].name),
        // onEnterBack: () => console.log('entering bottom'),
        onLeaveBack: noop,
      });
    });
  }, [epochRefs, epochsData, onUpdateCurrentInstant]);

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

// const toScrollTriggerCallbacks = (data: any, refs: any) => (
//   onEnter: any = toNoop, 
//   onLeave: any = toNoop,
//   onEnterBack: any = toNoop, 
//   onLeaveBack: any = toNoop,
// ) => {
//   useEffect(() => {
//     if (!data.length) return;
//     refs.current.forEach((ref: any, ix: any) => {
//       ScrollTrigger.create({
//         trigger: ref,
//         markers: true,
//         start: 'top 165px',
//         end: 'bottom 165px',
//         onEnter: onEnter(data[ix]),
//         onLeave: onLeave(data[ix]),
//         onEnterBack: onEnterBack(data[ix]),
//         onLeaveBack: onLeaveBack(data[ix]),
//       });
//     });
//   }, [onEnter, onLeave, onEnterBack, onLeaveBack]);
// };

const Timeline = (): JSX.Element => {

  console.log('rendering timeline');

  // Just put the fkn epochs and eras in at start and change their class on scroll trigger
  // Otherwise look into how to only update re-render one component on state update
  // Maybe wrap the entire timeline in a useMemo and pass the 
  // values to the text components

  // Use a useRef to hold the current instant and then
  // send it as a prop to CurrentTime
  // then only that will rerender

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
  // toScrollTriggerCallbacks(eonsData, eonRefs)();
  // toScrollTriggerCallbacks(erasData, eraRefs)();
  // toScrollTriggerCallbacks(periodsData, periodRefs)();
  // toScrollTriggerCallbacks(epochsData, epochRefs)(
  //   (stratum: any) => () => console.log(`Entered epoch: ${stratum.name}`),
  //   (stratum: any) => () => console.log(`Left epoch: ${stratum.name}`),
  //   (stratum: any) => () => console.log(`Entered epoch: ${stratum.name}`),
  //   (stratum: any) => () => console.log(`Left epoch: ${stratum.name}`),
  // );

  return (
    <div className="text-center">
      <Navbar />
        {/* <CurrentTime currentInstant={currentInstant} /> */}
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