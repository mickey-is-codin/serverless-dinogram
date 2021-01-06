import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { GeologicDelineation } from './GeologicDelineation';
import CampaignsTimeline from './CampaignsTimeline';
import TimeSidebar from './TimeSidebar';
import ArticleSidebar from './ArticleSidebar';
import { 
  GeologicTimeline, 
  PageNames, 
  Strata, 
} from '../util/types';
import { BASE_TIMELINE, GET_CAMPAIGN_LIST } from '../util/constants';
import { useStratum } from '../util/hooks';
import { toCampaignList } from '../util/mailchimp';
import { QueryResult, useQuery } from '@apollo/client';

// TODO: Favicon and site title
// TODO: Remove duplicate campaigns
// TODO: Hover image preview

const Timeline: React.FC = () => {

  const [ timelineData ] = useState<GeologicTimeline>(BASE_TIMELINE);
  const { eons, eras, periods, epochs } = timelineData;

  const strata: Strata = {
    eons: useStratum(eons),
    eras: useStratum(eras),
    periods: useStratum(periods),
    epochs: useStratum(epochs),
  };

  const campaignListResponse: QueryResult = useQuery(GET_CAMPAIGN_LIST);
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