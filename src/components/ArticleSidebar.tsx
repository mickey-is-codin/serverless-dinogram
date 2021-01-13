import React, { useState } from 'react';
import { CampaignList } from '../util/types';
import ExpandedSidebar from './ExpandedSidebar';
import CollapsedSidebar from './CollapsedSidebar';

// Just bring these back to the same file

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