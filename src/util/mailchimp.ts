import { 
  CampaignList,
  Campaign,
  CampaignResponse,
  CampaignListResponse,
  CampaignsByDate,
} from './types';
import { CAMPAIGNS_METADATA, OMITTED_CAMPAIGNS } from '../util/constants';
import { QueryResult } from '@apollo/client';
import { pluck, unique } from '../util/fp';

import '../styles/tailwind.output.css';

const inOmittedCampaigns = (omittedCampaigns: string[]) => (id: string) => {
  return omittedCampaigns.some((omittedId) => omittedId === id);
};
const isOmittedCampaign = inOmittedCampaigns(OMITTED_CAMPAIGNS);

const toParsedResponse = (
  response: CampaignListResponse
): CampaignResponse[] => {
  const { campaignList: campaignListResponse } = response;
  const { campaigns } = JSON.parse(campaignListResponse);
  return campaigns;
};

const responseToCampaign = (
  campaignResponse: CampaignResponse
): Campaign => {
  const { 
    id,
    archive_url: archiveUrl,
    long_archive_url: longArchiveUrl,
    settings: { title }
  } = campaignResponse;
  const campaign = { 
    id, 
    title, 
    archiveUrl, 
    longArchiveUrl,
    ref: null,
    ...CAMPAIGNS_METADATA[title],
  };
  return campaign;
};

const responseToCampaignList = (
  campaigns: CampaignResponse[]
): CampaignList => {
  const campaignList: CampaignList = campaigns.reduce((
    currentList: CampaignList,
    campaignResponse: CampaignResponse
  ) => {
    if (isOmittedCampaign(campaignResponse.id)) return currentList;
    return [...currentList, responseToCampaign(campaignResponse)];
  }, []);
  return campaignList;
};

export const toCampaignList = (
  campaignListResponse: QueryResult
): CampaignList => {
  const { data } = campaignListResponse;
  if (!data) return [];
  const campaigns: CampaignResponse[] = toParsedResponse(data);
  const campaignList = responseToCampaignList(campaigns);
  return campaignList;
};

export const toCampaignsByDate = (dateKey: string) => (campaigns: any[]) => {
  const dates = campaigns.map(pluck(dateKey))
  const uniqueDates = unique(dates);
  const campaignsByEnd: CampaignsByDate = uniqueDates.reduce((
    campaignGrouped: CampaignsByDate,
    date: number
  ) => {
    return {
      ...campaignGrouped,
      [date]: campaigns.filter((campaign: any) => campaign[dateKey] === date)
    };
  }, {});
  return campaignsByEnd;
};