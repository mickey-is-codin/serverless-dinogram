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

const toCampaignListItem = (campaign: any, ix: any) => {
  // console.log('campaign: ', campaign);
  const baseClasses = "text-bone text-2xl absolute z-90 w-1/6 mx-auto";
  const classNames=`${baseClasses}`;
  return (
    <div 
      className={classNames}
      style={{
        top: `${campaign.start / 100}vh`
      }}
      key={`${campaign.title}-${campaign.start}-${ix}`}
    >
      <div>
        {campaign.title}
      </div>
    </div>
  );
}

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

  // Make these one function to just get "campaignList"
  const campaignList = toCampaignList(campaignListData, isOmitted);
  const campaignListWithMetadata = toAddMetadata(campaignList, campaignsMetadata);
  
  return (
    <div className="z-90">
      {campaignListWithMetadata.map(toCampaignListItem)}
    </div>
  );
};