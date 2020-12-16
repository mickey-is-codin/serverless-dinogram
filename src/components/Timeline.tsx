import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { CurrentTime } from './CurrentTime';
import { GeologicDelineation } from './GeologicDelineation';

import { GeologicTimeline, GeologicValueRefTuple } from '../util/types';
import { toTimelineData } from '../util/geologicTimeline';
import { useDelineationRefArray } from '../util/hooks';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

const Timeline = (): JSX.Element => {
  
  const [ timelineData] = useState<GeologicTimeline>(toTimelineData());
  const { eons, eras, periods, epochs } = timelineData;

  const eonValueRefs: GeologicValueRefTuple = useDelineationRefArray(eons);
  const eraValueRefs: GeologicValueRefTuple = useDelineationRefArray(eras);
  const periodValueRefs: GeologicValueRefTuple = useDelineationRefArray(periods);
  const epochValueRefs: GeologicValueRefTuple = useDelineationRefArray(epochs);

  return (
    <div className="text-center">
      <Navbar />
        <CurrentTime
          eons={eonValueRefs}
          eras={eraValueRefs}
          periods={periodValueRefs}
          epochs={epochValueRefs}
        />
        <h1 className="text-3xl text-bone">
          A Tour Through the Earth
        </h1>
        <TimelineStart />
        <div className="relative flex justify-center">
          <TimelineBody />
          <GeologicDelineation name="Eon" valueRefs={eonValueRefs} />
          <GeologicDelineation name="Era" valueRefs={eraValueRefs} />
          <GeologicDelineation name="Period" valueRefs={periodValueRefs} />
          <GeologicDelineation name="Epoch" valueRefs={epochValueRefs} />
        </div>
    </div>
  );
};

export default Timeline;