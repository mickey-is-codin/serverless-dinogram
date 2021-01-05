import React from 'react';
import { CollapsedArticleSidebarWrapper } from './ArticleSidebarWrapper';

interface CollapsedSidebarProps {
  onExpand: () => void;
};
const CollapsedSidebar: React.FC<CollapsedSidebarProps> = (props) => {
  const { onExpand } = props;
  return (
    <CollapsedArticleSidebarWrapper onClick={onExpand}>
      Articles List
    </CollapsedArticleSidebarWrapper>
  );
};

export default CollapsedSidebar;