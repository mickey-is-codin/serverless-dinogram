import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { GeologicDelineation } from './GeologicDelineation';
import CampaignsTimeline from './CampaignsTimeline';
import { 
  GeologicTimeline, 
  PageNames, 
  Strata, 
  toStratum,
  CampaignListResponse,
} from '../util/types';
import { BASE_TIMELINE } from '../util/timeline';
import { useDelineationRefArray } from '../util/hooks';
import { toCampaignList } from '../util/mailchimp';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';
import TimeSidebar from './TimeSidebar';
import ArticleSidebar from './ArticleSidebar';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

import { GET_CAMPAIGN_LIST } from '../util/constants';

import { useQuery } from '@apollo/client';

// TODO: Favicon and site title
// TODO: Remove duplicate campaigns
// TODO: Strata = array of delineations?

const Timeline: React.FC = () => {

  const [ timelineData] = useState<GeologicTimeline>(BASE_TIMELINE);
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

  const { data: campaignListResponse } = useQuery<CampaignListResponse>(GET_CAMPAIGN_LIST);
  const campaignList = toCampaignList(campaignListResponse);

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
      <CampaignsTimeline campaignList={campaignList} />
      <ArticleSidebar campaignList={campaignList} />
    </div>
  );
};

export default Timeline;