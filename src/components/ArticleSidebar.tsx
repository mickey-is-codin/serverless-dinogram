import React, { useState } from 'react';
import { CampaignList, CampaignListItem } from '../util/types';

interface CollapsedSidebarProps {
  onExpand: () => void;
};
const CollapsedSidebar: React.FC<CollapsedSidebarProps> = (props) => {
  const { onExpand } = props;
  return (
    <div
      className="fixed text-center right-0 z-90 text-bone w-1/3 px-10 mt-10"
    >
      <button 
        className="bg-green-700 rounded-md px-4 py-2"
        onClick={onExpand}
      >
        Articles List
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
    <div 
      className="fixed text-center right-0 z-90 text-bone w-1/3 px-10 mt-10"
    >
      <div 
        className="bg-green-700 rounded-md px-4 py-2"
      >
        <button onClick={onCollapse}>Hide article list</button>
        {campaignList.map((campaign: CampaignListItem, ix: number) => {
          return (
            <div
              className="my-4"
              key={`sidebar-list-${campaign.title}-${ix}`}
            >
              <button 
                onClick={() => campaign.ref.current.scrollIntoView({
                  behavior: "smooth"
                })}
              >
                {campaign.title}
              </button>
            </div>
          )
        })}
        <button onClick={onCollapse}>Hide article list</button>
      </div>
    </div>
  );
};

interface ArticleSidebarProps {
  campaignList: CampaignList
};
const ArticleSidebar: React.FC<ArticleSidebarProps> = (props) => {
  const { campaignList } = props;
  const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true);
  return (
    isCollapsed 
      ? <CollapsedSidebar onExpand={() => setIsCollapsed(false)}/> 
      : <ExpandedSidebar
          campaignList={campaignList}
          onCollapse={() => setIsCollapsed(true)}
        />
  );
};

export default ArticleSidebar;