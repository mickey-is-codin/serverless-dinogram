import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { 
  toTimelineData,
  toPresentTime,
  EARTH_AGE_HUNDRED_MILL,
} from '../stratigraphy/geologicTimeline';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineSectionProps {
  sectionNumber: number;
};

const TimelineStart = () => {
  return (
    <div className="bg-brown-900">
      <div className="flex justify-center" >
        <div className="h-1/6 w-1/6 bg-bone text-center rounded-t-md">Present Day</div>
      </div>
    </div>
  );
};

const TimelineEnd = () => {
  return (
    <div className="bg-brown-900">
      <div className="flex justify-center" >
        <div className="h-1/6 w-1/6 bg-bone text-center rounded-b-md">Earth Formed</div>
      </div>
    </div>
  );
};

const toYear = (sectionNumber: number) => {
  return sectionNumber 
    ? `${sectionNumber}0 million years ago`
    : ``
};
const TimelineSection = (props: TimelineSectionProps) => {
  const { sectionNumber } = props;
  return (
    <div className="h-screen bg-brown-900">
      <div className="flex justify-center" >
        <div className="h-screen w-1/6 text-center bg-bone">
          {toYear(sectionNumber)}
        </div>
      </div>
    </div>
  );
};

const TimelineBody = () => {
  const sectionNumbers = Array.from({ length: EARTH_AGE_HUNDRED_MILL }, (_, ix) => ix);
  const timelineSections = sectionNumbers.map((sectionNumber) => {
    return (
      <TimelineSection
        sectionNumber={sectionNumber}
        key={`timeline-section-${sectionNumber}`}
      />
    );
  });
  return (
    <>
      {timelineSections}
    </>
  );
};

const CurrentTime = ({ currentTime }: any) => {
  const { eon, era, period, epoch } = currentTime;
  const eonText = `Eon: ${eon}`;
  const eraText = `Era: ${era}`;
  const periodText = `Period: ${period}`;
  const epochText = `Epoch: ${epoch}`;
  return (
    <div className="fixed text-left text-xl pt-10 px-10 left-10 text-bone">
      <p>{eonText}</p>
      <p>{eraText}</p>
      <p>{periodText}</p>
      <p>{epochText}</p>
    </div>
  );
};

// GSAP Basics
// const Animation = () => {

//   const boxRef: any = useRef();
//   const timeline = gsap.timeline()
//   useEffect(() => {
//     timeline
//       .to([boxRef.current], { x: '500px', duration: 1 })
//       .to([boxRef.current], { x: '0', duration: 1 });
//   });

//   return (
//     <div
//       ref={boxRef}
//       className="m-24 w-24 h-24 bg-red-300"
//     >A</div>
//   );
// };

const GeologicDelineation = ({ delineation }: any) => {
  return (
    <div>

    </div>
  );
};

const Timeline = () => {

  const [ timelineData ] = useState(toTimelineData());
  const { eons, eras, periods, epochs } = timelineData;

  const [ currentTime, setCurrentTime ] = useState(toPresentTime());

  // Next step:
  // Import years and place them on the timeline.
  // Once that's done we can animate based on them
  // Maybe literally make components for each
  // Put components under the timeline body

  return (
    <div className="text-center">
      <Navbar />
        <CurrentTime currentTime={currentTime} />
        <h1 className="text-3xl text-bone">
          A Tour Through the Earth
        </h1>
        <TimelineStart />
        {/* <Animation /> */}
        <GeologicDelineation delineation={eons} />
        <GeologicDelineation delineation={eras} />
        <GeologicDelineation delineation={periods} />
        <GeologicDelineation delineation={epochs} />
        <TimelineBody />
        <TimelineEnd />
    </div>
  );
};

export default Timeline;