import React, { useState } from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { CurrentTime } from './CurrentTime';
import { GeologicDelineation } from './GeologicDelineation';

import campaignsData from '../util/campaignsData.json';
import omittedCampaignsData from '../util/omittedCampaigns.json';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

import { 
  GeologicTimeline, 
  Strata, 
  StratumData, 
  PageNames, 
  CampaignListResponse,
  CampaignHtmlResponse,
  CampaignList,
  CampaignMetadataList,
  CampaignListItem,
} from '../util/types';
import { toTimelineData } from '../util/geologicTimeline';
import { useDelineationRefArray } from '../util/hooks';

import { gql, useQuery } from '@apollo/client';

const GET_CAMPAIGN_LIST = gql`
  query GetCampaignList {
    campaignList
  }
`;

const GET_CAMPAIGN_HTML = gql`
  query GetCampaignHtml($id: String!) {
    campaignHtml(id: $id)
  }
`;

const toStratum = (
  name: string,
  data: StratumData[],
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => ({
  name,
  data,
  refs,
});

const inOmittedCampaigns = (omittedCampaigns: CampaignList) => (id: string) => {
  return omittedCampaigns.some(({ id: omittedId }) => omittedId === id);
};

const toCampaignList = (
  responseData: CampaignListResponse | undefined,
  isOmitted: (id: string) => boolean
): CampaignList => {
  if (!responseData) return [];
  const { campaignList: campaignListResponse } = responseData;
  const { campaigns } = JSON.parse(campaignListResponse);
  return campaigns.reduce((list: CampaignList, campaign: any) => {
    const { id, settings: { title }} = campaign;
    return isOmitted(id) ? [ ...list ] : [ ...list, { id, title } ];
  }, []);
};

const toAddMetadata = (
  campaignList: CampaignList,
  metadataList: CampaignMetadataList
) => {
  return campaignList.reduce((list: CampaignList, campaign: CampaignListItem) => {
    const metadata = metadataList.find((campaignMeta) => {
      return campaignMeta.title === campaign.title;
    });
    return [ 
      ...list,  
      {
        ...campaign, 
        ...metadata
      }
    ];
  }, []);
};

// Abstract query response into a component
const Campaigns: React.FC = () => {

  const [ campaignsMetadata ] = useState(campaignsData);
  const [ omittedCampaigns ] = useState<CampaignList>(omittedCampaignsData);
  const isOmitted = inOmittedCampaigns(omittedCampaigns);

  const {
    loading: campaignListLoading,
    error: campaignListError,
    data: campaignListData,
  } = useQuery<CampaignListResponse>(GET_CAMPAIGN_LIST);

  // if (campaignListLoading) return <p>Loading...</p>;
  // if (campaignListError) {
  //   console.log(`Error: ${campaignListError}`);
  //   return <p>Error fetching campaigns :(</p>;
  // }

  // if (campaignListData === undefined) {
  //   console.log('Error fetching campaigns');
  //   return <p>Error fetching campaigns :(</p>;
  // }

  const campaignList = toCampaignList(campaignListData, isOmitted);
  const campaignListWithMetadata = toAddMetadata(campaignList, campaignsMetadata);

  const [ first = {} ]: any[] = campaignListWithMetadata;
  console.log('campaignListWithMetadata: ', campaignListWithMetadata);
  console.log('first.id: ', first.id);

  console.log('campaignListLoading: ', campaignListLoading);
  console.log('campaignListError: ', campaignListError);
  const { 
    // loading: campaignHtmlLoading,
    // error: campaignHtmlError,
    data: campaignHtmlData
  } = useQuery<CampaignHtmlResponse>(GET_CAMPAIGN_HTML, {
    skip: !first.id || campaignListLoading || !!campaignListError,
    variables: { id: first.id },
  });

  if (!campaignHtmlData) return null;

  const campaignHtml = campaignHtmlData?.campaignHtml as string;
  const campaignHtmlObject = JSON.parse(campaignHtml);
  const htmlString = campaignHtmlObject.html;

  console.log('htmlString: ', htmlString);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

// TODO: Cleanup
// TODO: Figure out what's causing fast scroll crash
// Weird, scrolling too far down causes everything to default to "Earlier"
// That seems like the biggest bug to work out
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
  // 1. Get list of campaignIDs (campaignListQuery campaignList & destructure)
  // 2. Merge them with campaignData
  // 3. Calculate right timeline location for each campaign
  // 4. Write element so that onClick triggers graphql request (campaignListQuery campaignHtml)

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