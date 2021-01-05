import React from 'react';

interface CollapsedSidebarWrapperProps {
  children: React.ReactNode;
  onClick?: () => void
};
export const CollapsedArticleSidebarWrapper: React.FC<CollapsedSidebarWrapperProps> = (props) => {
  const { children, onClick } = props;
  return (
    <div className="article-sidebar-outer">
      <button className="article-sidebar-inner" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

interface ExpandedSidebarWrapperProps {
  children: React.ReactNode;
};
export const ExpandedArticleSidebarWrapper: React.FC<ExpandedSidebarWrapperProps> = (props) => {
  const { children } = props;
  return (
    <div className="article-sidebar-outer">
      <div className="article-sidebar-inner">
        {children}
      </div>
    </div>
  );
};