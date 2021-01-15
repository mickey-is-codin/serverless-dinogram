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
        className="absolute w-screen flex z-30"
        style={{
          top: `${parseInt(date) + DATE_OFFSET - EVENT_RADIUS}vh`,
        }}
      >
        <div
          className="bg-black rounded-full mx-5 sm:mx-auto"
          style={{
            height: `${EVENT_DIAMETER}vh`,
            width: `${EVENT_DIAMETER}vh`,
          }}
        >
          <div
            className="bg-brown-900 rounded-full m-2"
            style={{
              height: `${EVENT_INNER_DIAMETER}vh`,
              width: `${EVENT_INNER_DIAMETER}vh`,
            }}
          ></div>
        </div>
      </div>
      <div
        className="absolute w-screen flex z-30"
        style={{
          top: `${parseInt(date) + DATE_OFFSET - .25}vh`,
        }}
      >
        <div className="sm:w-1/2 sm:flex"></div>
        <div
          className="mx-8 w-64 sm:mx-0 sm:w-64 sm:right-0 border-brown-900 border-t-4 flex"
        >
          <div className="text-bone bg-red-400 flex-1 invisible">
            First
          </div>
          <div
            className="text-bone bg-brown-900 rounded-b-md flex-1"
            >
            <p>{event}</p>
          </div>
        </div>
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
        );
      })}
    </>
  );
};

export default Annotations;