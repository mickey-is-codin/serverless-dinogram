import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Navbar from './Navbar';
import { 
  // toTimelineData,
  EARTH_AGE_HUNDRED_MILL,
} from '../stratigraphy/geologicTimeline';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

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

const FadeIn = ({ children, inProp, ...props }: any) => {
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={5000}
      classNames="timeline"
      in={inProp}
      {...props}
    >
      <div ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

const Timeline = () => {

  // const [ timelineData ] = useState(toTimelineData());
  const [ inProp, setInProp ] = useState(false);
  useEffect(() => {
    setInProp(true);
  }, []);

  console.log('render');

  return (
    <div className="text-center">
      <Navbar />
        <FadeIn inProp={inProp}>
          <>
            <h1 className="text-3xl text-bone">
              Dinosaurs Through the Ages
            </h1>
            <TimelineStart />
            <TimelineBody />
            <TimelineEnd />
          </>
        </FadeIn>
    </div>
  );
};

export default Timeline;