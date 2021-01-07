import { 
  CampaignList,
  Campaign,
  CampaignResponse,
  CampaignListResponse,
} from './types';
import { CAMPAIGNS_METADATA, OMITTED_CAMPAIGNS } from '../util/constants';
import { QueryResult } from '@apollo/client';

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
    const { id } = campaignResponse;
    if (isOmittedCampaign(id)) return currentList;
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