import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { CurrentTime } from './CurrentTime';
import { GeologicDelineation } from './GeologicDelineation';

import { GeologicTimeline, Strata } from '../util/types';
import { toTimelineData } from '../util/geologicTimeline';
import { useDelineationRefArray } from '../util/hooks';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

const toStratum = (name: any, strata: any, refs: any) => ({
  name,
  strata,
  refs,
});

const Timeline: React.FC = () => {
  
  const [ timelineData] = useState<GeologicTimeline>(toTimelineData());
  const { eons, eras, periods, epochs } = timelineData;

  const [ eonStrata, eonRefs ] = useDelineationRefArray(eons);
  const [ eraStrata, eraRefs ] = useDelineationRefArray(eras);
  const [ periodStrata, periodRefs ] = useDelineationRefArray(periods);
  const [ epochStrata, epochRefs ] = useDelineationRefArray(epochs);

  const strata: Strata = {
    eons: toStratum('Eon', eonStrata, eonRefs),
    eras: toStratum('Era', eraStrata, eraRefs),
    periods: toStratum('Period', periodStrata, periodRefs),
    epochs: toStratum('Epoch', epochStrata, epochRefs),
  };

  return (
    <div className="text-center">
      <Navbar />
        <CurrentTime strata={strata} />
        <h1 className="text-3xl text-bone">
          A Tour Through the Earth
        </h1>
        <TimelineStart />
        <div className="relative flex justify-center">
          <TimelineBody />
          <GeologicDelineation stratum={strata.eons} />
          <GeologicDelineation stratum={strata.eras} />
          <GeologicDelineation stratum={strata.periods} />
          <GeologicDelineation stratum={strata.epochs} />
        </div>
    </div>
  );
};

export default Timeline;