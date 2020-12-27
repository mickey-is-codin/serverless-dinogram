import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { CurrentTime } from './CurrentTime';
import { GeologicDelineation } from './GeologicDelineation';
// import { Campaigns } from './Mailchimp';
import { 
  GeologicTimeline, 
  PageNames, 
  Strata, 
  StratumData, 
} from '../util/types';
import { toTimelineData } from '../util/geologicTimeline';
import { useDelineationRefArray } from '../util/hooks';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

const toStratum = (
  name: string,
  data: StratumData[],
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => ({
  name,
  data,
  refs,
});

// TODO: Fast scroll crash
// TODO: Hanging on "Earlier"
// TODO: Campaign list rendering
// TODO: Individual campaign rendering
// TODO: Make timeline crooked
// TODO: Strata = array of delineations?

// "Earlier hang" notes:
// When Period is exited, everything goes to Earlier
// Current timeline renders a bunch of times in a row
// Final on leave gets called a ton of times...
// Hmm, changing periods after epoch ends calls the epoch callback
// Should check where the html element ends
// Oh weird, period was ending prematurely before?
// It seems like we might be calling all setters when we leave final epoch only?

// Bah, think I found the issue. No need to setup scroll triggers every time
// Only need to setup first mount probably

// Or wait, just put the hook in the timeline component!

// Still setting up every time
// Need to add an existing triggers check

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
          {/* <Campaigns /> */}
        </div>
    </div>
  );
};

export default Timeline;