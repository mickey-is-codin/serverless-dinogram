import React from 'react';
import {
  ANNOTATIONS,
  DATE_OFFSET,
  EVENT_DIAMETER,
  EVENT_INNER_DIAMETER,
  EVENT_RADIUS
} from '../util/constants';

interface AnnotationProps {
  date: string;
  event: string;
};
const Annotation: React.FC<AnnotationProps> = (props) => {
  const { date, event } = props;
  return (
    <>
      <div
        className="absolute flex justify-around w-full z-30"
        style={{
          top: `${parseInt(date) + DATE_OFFSET - EVENT_RADIUS}vh`,
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
          top: `${parseInt(date) + DATE_OFFSET - .25}vh`,
          left: '50%',
          width: '10%',
        }}
      ></div>
      <div
        className="absolute text-brown-900 z-30 bg-bone px-2 py-6 rounded-b-md"
        style={{
          top: `${parseInt(date) + DATE_OFFSET - .25}vh`,
          left: '60%'
        }}
      >
        <p>{event}</p>
      </div>
    </>
  );
};

const Annotations: React.FC = () => {
  const annotationDates: string[] = Object.keys(ANNOTATIONS);
  return (
    <>
      {annotationDates.map((annotationDate) => {
        return (
          <Annotation
            date={annotationDate}
            event={ANNOTATIONS[annotationDate]}
            key={`annotation-${annotationDate}`}
          />
      ) ;
      })}
    </>
  );
};

export default Annotations;