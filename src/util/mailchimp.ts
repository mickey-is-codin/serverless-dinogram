import { 
  CampaignList,
  Campaign,
  CampaignMetadataList,
  CampaignResponse,
  CampaignListResponse,
  CampaignMetadata
} from './types';
import { CAMPAIGNS_METADATA, OMITTED_CAMPAIGNS } from '../util/constants';
import { QueryResult } from '@apollo/client';

const inOmittedCampaigns = (omittedCampaigns: string[]) => (id: string) => {
  return omittedCampaigns.some((omittedId) => omittedId === id);
};
const isOmittedCampaign = inOmittedCampaigns(OMITTED_CAMPAIGNS);

const toMatchingMetadata = (
  metadataList: CampaignMetadataList,
  campaign: Campaign
) => {
  return metadataList.find((campaignMeta: CampaignMetadata) => {
    return campaignMeta.title === campaign.title;
  });
};

const toWithMetadata = (
  metadataList: CampaignMetadataList
) => (
  campaignList: CampaignList
) => {
  const listWithMetadata = campaignList.reduce((
    list: CampaignList,
    campaign: Campaign
  ) => {
    const matchingMetadata = toMatchingMetadata(metadataList, campaign);
    const campaignWithMetadata = {
      ...campaign, 
      ...matchingMetadata
    };
    return [ ...list, campaignWithMetadata ];
  }, []);
  return listWithMetadata;
};
const withCampaignMetadata = toWithMetadata(CAMPAIGNS_METADATA);

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
    archive_url,
    long_archive_url,
    settings: { title }
  } = campaignResponse;
  const campaign = { 
    id, 
    title, 
    archiveUrl: archive_url, 
    longArchiveUrl: long_archive_url
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
  return withCampaignMetadata(campaignList);
};