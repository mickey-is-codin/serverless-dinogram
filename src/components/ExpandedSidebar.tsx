import React from 'react';
import { ExpandedArticleSidebarWrapper } from './ArticleSidebarWrapper';
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
  return (
    <ExpandedArticleSidebarWrapper>
      <button onClick={onCollapse}>Hide article list</button>
        {!campaignList.length ? ArticleListLoading : null}
        {campaignList.map(toArticleSidebarDisplay)}
        <button onClick={onCollapse}>Hide article list</button>
    </ExpandedArticleSidebarWrapper>
  );
};

export default ExpandedSidebar;