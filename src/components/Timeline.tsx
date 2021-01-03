import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { GeologicDelineation } from './GeologicDelineation';
import { CampaignsTimeline } from './Mailchimp';
import { 
  GeologicTimeline, 
  PageNames, 
  Strata, 
  toStratum,
} from '../util/types';
import { toTimelineData } from '../util/geologicTimeline';
import { useDelineationRefArray } from '../util/hooks';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';
import TimeSidebar from './TimeSidebar';

// TODO: Favicon and site title
// TODO: Campaign list refactor & cleanup
// TODO: Remove duplicate campaigns
// TODO: Collapsible Sidebar & Autoscroll
// TODO: Individual campaign rendering
// TODO: Strata = array of delineations?

const Timeline: React.FC = () => {

  const [ timelineData] = useState<GeologicTimeline>(toTimelineData());
  const { eons, eras, periods, epochs } = timelineData;

  const [ eonData, eonRefs ] = useDelineationRefArray(eons);
  const [ eraData, eraRefs ] = useDelineationRefArray(eras);
  const [ periodData, periodRefs ] = useDelineationRefArray(periods);
  const [ epochData, epochRefs ] = useDelineationRefArray(epochs);

  const strata: Strata = {
    eons: toStratum('Eon', eonData, eonRefs),
    eras: toStratum('Era', eraData, eraRefs),
    periods: toStratum('Period', periodData, periodRefs),
    epochs: toStratum('Epoch', epochData, epochRefs),
  };

  return (
    <div className="text-center">
      <Navbar pageName={PageNames.Timeline} />
      <TimeSidebar strata={strata} />
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
      <CampaignsTimeline />
    </div>
  );
};

export default Timeline;