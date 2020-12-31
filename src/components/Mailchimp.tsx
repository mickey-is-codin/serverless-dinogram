import React, { useState } from 'react';

import campaignsData from '../util/campaignsData.json';
import omittedCampaignsData from '../util/omittedCampaigns.json';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

import { 
  CampaignListResponse,
  CampaignList,
  CampaignMetadataList,
  CampaignListItem,
} from '../util/types';
import { GET_CAMPAIGN_LIST } from '../util/constants';

import { useQuery } from '@apollo/client';

const inOmittedCampaigns = (omittedCampaigns: CampaignList) => (id: string) => {
  return omittedCampaigns.some(({ id: omittedId }) => omittedId === id);
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

const toCampaignList = (
  responseData: CampaignListResponse | undefined,
  isOmitted: (id: string) => boolean
): CampaignList => {
  if (!responseData) return [];
  const { campaignList: campaignListResponse } = responseData;
  const { campaigns } = JSON.parse(campaignListResponse);
  const campaignList = campaigns.reduce((list: CampaignList, campaign: any) => {
    const { 
      id,
      archive_url,
      long_archive_url,
      settings: { title }
    } = campaign;
    return isOmitted(id) 
      ? [ ...list ] 
      : [ ...list, { id, title, archiveUrl: archive_url, longArchiveUrl: long_archive_url } ];
  }, []);
  return toAddMetadata(campaignList, campaignsData);
};

const toCampaignListItem = (campaign: any, ix: any) => {
  const baseClasses = "text-brown-900 text-2xl absolute z-90 w-full mx-auto flex justify-around";
  const classNames=`${baseClasses}`;
  return (
    <div 
      className={classNames}
      style={{
        top: `${campaign.start / 100}vh`
      }}
      key={`${campaign.title}-${campaign.start}-${ix}`}
    >
      <div className="">
        <a 
          href={campaign.longArchiveUrl}
          className="hover:text-orange-700"
        >
          {campaign.title}
        </a>
      </div>
    </div>
  );
}

export const CampaignsTimeline: React.FC = () => {

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
  
  return (
    <div className="z-90">
      {campaignList.map(toCampaignListItem)}
    </div>
  );
};