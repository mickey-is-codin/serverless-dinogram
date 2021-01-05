import { CAMPAIGNS_METADATA, OMITTED_CAMPAIGNS } from '../util/campaigns';
import { CampaignList, Campaign, CampaignListResponse, CampaignMetadataList } from './types';

const inOmittedCampaigns = (omittedCampaigns: string[]) => (id: string) => {
  return omittedCampaigns.some((omittedId) => omittedId === id);
};
const isOmitted = inOmittedCampaigns(OMITTED_CAMPAIGNS);

const toAddMetadata = (
  campaignList: CampaignList,
  metadataList: CampaignMetadataList
) => {
  return campaignList.reduce((list: CampaignList, campaign: Campaign) => {
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

export const toCampaignList = (
  responseData: CampaignListResponse | undefined,
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
  return toAddMetadata(campaignList, CAMPAIGNS_METADATA);
};