import campaignsData from '../util/campaignsData.json';
import omittedCampaignsData from '../util/omittedCampaigns.json';
import { CampaignList, CampaignListItem, CampaignListResponse, CampaignMetadataList } from './types';

const inOmittedCampaigns = (omittedCampaigns: CampaignList) => (id: string) => {
  return omittedCampaigns.some(({ id: omittedId }) => omittedId === id);
};
const isOmitted = inOmittedCampaigns(omittedCampaignsData);

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
  return toAddMetadata(campaignList, campaignsData);
};