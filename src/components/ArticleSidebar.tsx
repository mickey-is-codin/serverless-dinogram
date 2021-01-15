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
    <div className="fixed text-center right-0 z-90 w-64 px-10 mt-10 text-bone">
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