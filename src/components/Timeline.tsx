import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { CurrentTime } from './CurrentTime';
import { GeologicDelineation } from './GeologicDelineation';

import { 
  GeologicTimeline, 
  Strata, 
  StratumData, 
  PageNames, 
  CampaignListResponse,
  CampaignList
} from '../util/types';
import { toTimelineData } from '../util/geologicTimeline';
import { useDelineationRefArray } from '../util/hooks';

import { gql, useQuery } from '@apollo/client';

const toStratum = (
  name: string,
  data: StratumData[],
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => ({
  name,
  data,
  refs,
});

const toCampaignList = (data: CampaignListResponse): CampaignList => {
  const campaignListResponse: string = data.campaignList;
  const { campaigns } = JSON.parse(campaignListResponse);
  return campaigns.reduce((list: CampaignList, campaign: any) => {
    const { id, settings: { title }} = campaign;
    return [ ...list, { id, title }];
  }, []);
};

const Campaigns: React.FC = () => {
  const query = gql`{ campaignList }`;

  const { loading, error, data } = useQuery<CampaignListResponse>(query);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(`Error: ${error}`);
    return <p>Error fetching campaigns :(</p>;
  }

  if (data === undefined) {
    console.log('Error fetching campaigns');
    return <p>Error fetching campaigns :(</p>;
  }

  const campaignList = toCampaignList(data);

  console.log('campaignList: ', campaignList);

  return (
    <>
    </>
  );
};

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

  // Need to retrieve list of campaignIds and merge it
  // with data from campaignData.json

  // Then we'll have single IDs associated with a given spot on the timeline
  // From there, clicking on one will make a request to campaignHtml

  // TODO: Order of operations
  // 1. Get list of campaignIDs (query campaignList & destructure)
  // 2. Merge them with campaignData
  // 3. Calculate right timeline location for each campaign
  // 4. Write element so that onClick triggers graphql request (query campaignHtml)

  // const campaignList = ...;

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
          <Campaigns />
        </div>
    </div>
  );
};

export default Timeline;