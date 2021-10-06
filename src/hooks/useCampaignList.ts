import { GET_CAMPAIGN_LIST } from '../util/constants';
import { toCampaignList } from '../util/mailchimp';
import { QueryResult, useQuery } from '@apollo/client';
import { Campaign } from '../util/types';

export const useCampaignList = (): Campaign[] => {
  const campaignListResponse: QueryResult = useQuery(GET_CAMPAIGN_LIST);
  const campaignList = toCampaignList(campaignListResponse);
  return campaignList;
};