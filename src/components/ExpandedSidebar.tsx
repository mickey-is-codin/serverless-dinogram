import React from 'react';
import { Campaign, CampaignList } from '../util/types';

const toScrollToView = (campaign: Campaign) => () => campaign.ref.current.scrollIntoView({
  behavior: "smooth"
});

const ArticleListLoading: JSX.Element = <div className="my-4">Loading articles...</div>;

const toArticleSidebarDisplay = (campaign: Campaign, ix: number) => {
  return (
    <div
      className="my-4"
      key={`sidebar-list-${campaign.title}-${ix}`}
    >
      <button 
        onClick={toScrollToView(campaign)}
      >
        {campaign.title}
      </button>
    </div>
  );
};

interface ExpandedSidebarProps {
  campaignList: CampaignList;
  onCollapse: () => void;
};
const ExpandedSidebar: React.FC<ExpandedSidebarProps> = (props) => {
  const { campaignList, onCollapse } = props;
  const orderedList: CampaignList = campaignList.sort((
    { end: endA },
    { end: endB }
  ) => endA - endB);
  return (
    <>
      <button onClick={onCollapse} className="text-black text-opacity-50">Hide article list</button>
      {!campaignList.length ? ArticleListLoading : null}
      {orderedList.map(toArticleSidebarDisplay)}
      <button onClick={onCollapse} className="text-black text-opacity-50">Hide article list</button>
    </>
  );
};

export default ExpandedSidebar;