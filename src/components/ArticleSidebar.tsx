import React, { useState } from 'react';
import { CampaignList } from '../util/types';
import ExpandedSidebar from './ExpandedSidebar';

interface CollapsedSidebarProps {
  onExpand: () => void;
};
const CollapsedSidebar: React.FC<CollapsedSidebarProps> = (props) => {
  const { onExpand } = props;
  return (
    <button onClick={onExpand}>
      Articles List
    </button>
  );
};

interface ArticleSidebarProps {
  campaignList: CampaignList
};
const ArticleSidebar: React.FC<ArticleSidebarProps> = (props) => {
  const { campaignList } = props;
  const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true);
  return (
    <div className="fixed right-0 text-center px-4 md:mx-12 z-90 text-bone">
      <div className="bg-green-700 rounded-md px-4 py-2">
      {isCollapsed 
        ? <CollapsedSidebar onExpand={() => setIsCollapsed(false)}/> 
        : <ExpandedSidebar
            campaignList={campaignList}
            onCollapse={() => setIsCollapsed(true)}
          />}
      </div>
    </div>
  );
};

export default ArticleSidebar;