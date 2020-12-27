import { gql } from '@apollo/client';

export const EARLIER_DELINEATION = 'Earlier';

export const GET_CAMPAIGN_LIST = gql`
  query GetCampaignList {
    campaignList
  }
`;

// export const GET_CAMPAIGN_HTML = gql`
//   query GetCampaignHtml($id: String!) {
//     campaignHtml(id: $id)
//   }
// `;