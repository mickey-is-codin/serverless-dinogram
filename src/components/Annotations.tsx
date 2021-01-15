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
export const Annotation: React.FC<AnnotationProps> = (props) => {
  const { date, event } = props;
  return (
    <>
      <div
        className="absolute  ml-5 flex z-30"
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
            className="bg-brown-900 rounded-full"
            style={{
              height: `${EVENT_INNER_DIAMETER}vh`,
              width: `${EVENT_INNER_DIAMETER}vh`,
              margin: `1vh`,
            }}
          ></div>
        </div>
      </div>
      <div
        className="absolute ml-12 w-1/6 z-30 bg-brown-900 h-1"
        style={{
          top: `${parseInt(date) + DATE_OFFSET - .25}vh`,
          // left: '50%',
          // width: '10%',
        }}
      ></div>
      <div
        className="absolute ml-24 text-bone z-30 bg-brown-900 px-2 py-6 rounded-b-md"
        style={{
          top: `${parseInt(date) + DATE_OFFSET - .25}vh`,
          // left: '60%'
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