import React, { useState } from 'react';

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
  onCollapse: () => void;
};
const ExpandedSidebar: React.FC<ExpandedSidebarProps> = (props) => {
  const { onCollapse } = props;
  return (
    <div 
      className="fixed text-center right-0 z-90 text-bone w-1/3 px-10 mt-10"
    >
      <div 
        className="bg-green-700 rounded-md px-4 py-2"
      >
        <button onClick={onCollapse}>Hide article list</button>
        <div>Item 1</div>
        <div>Item 1</div>
        <div>Item 1</div>
        <div>Item 1</div>
        <div>Item 1</div>
        <div>Item 1</div>
        <button onClick={onCollapse}>Hide article list</button>
      </div>
    </div>
  );
};

interface ArticleSidebarProps {

};
const ArticleSidebar: React.FC<ArticleSidebarProps> = (props) => {
  const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true);
  return (
    isCollapsed 
      ? <CollapsedSidebar onExpand={() => setIsCollapsed(false)}/> 
      : <ExpandedSidebar onCollapse={() => setIsCollapsed(true)}/>
  );
};

export default ArticleSidebar