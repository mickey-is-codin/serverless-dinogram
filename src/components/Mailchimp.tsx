import React, { useState } from 'react';

import campaignsData from '../util/campaignsData.json';
import omittedCampaignsData from '../util/omittedCampaigns.json';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

import { 
  CampaignListResponse,
  // CampaignHtmlResponse,
  CampaignList,
  CampaignMetadataList,
  CampaignListItem,
} from '../util/types';
import { GET_CAMPAIGN_LIST } from '../util/constants';

import { useQuery } from '@apollo/client';

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
export const CampaignsTimeline: React.FC = () => {

  const [ campaignsMetadata ] = useState(campaignsData);
  const [ omittedCampaigns ] = useState<CampaignList>(omittedCampaignsData);
  const isOmitted = inOmittedCampaigns(omittedCampaigns);

  const {
    loading: campaignListLoading,
    error: campaignListError,
    data: campaignListData,
  } = useQuery<CampaignListResponse>(GET_CAMPAIGN_LIST);

  if (campaignListLoading) return <p>Loading...</p>;
  if (campaignListError) {
    console.log(`Error: ${campaignListError}`);
    return <p>Error fetching campaigns :(</p>;
  }

  if (campaignListData === undefined) {
    console.log('Error fetching campaigns');
    return <p>Error fetching campaigns :(</p>;
  }

  const campaignList = toCampaignList(campaignListData, isOmitted);
  const campaignListWithMetadata = toAddMetadata(campaignList, campaignsMetadata);
  console.log('with metadata: ', campaignListWithMetadata);

  // const [ first = {} ]: any[] = campaignListWithMetadata;
  // console.log('campaignListWithMetadata: ', campaignListWithMetadata);
  // console.log('first.id: ', first.id);

  // console.log('campaignListLoading: ', campaignListLoading);
  // console.log('campaignListError: ', campaignListError);
  // const { 
  //   // loading: campaignHtmlLoading,
  //   // error: campaignHtmlError,
  //   data: campaignHtmlData
  // } = useQuery<CampaignHtmlResponse>(GET_CAMPAIGN_HTML, {
  //   skip: !first.id || campaignListLoading || !!campaignListError,
  //   variables: { id: first.id },
  // });

  // if (!campaignHtmlData) return null;

  // const campaignHtml = campaignHtmlData?.campaignHtml as string;
  // const campaignHtmlObject = JSON.parse(campaignHtml);
  // const htmlString = campaignHtmlObject.html;

  // console.log('htmlString: ', htmlString);

  return (
    // <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    <>
    </>
  );
};