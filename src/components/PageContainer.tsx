import React from 'react';
import Navbar from './Navbar';

interface PageContainerProps {
  pageName: string;
  isMarkdown?: boolean;
  children: React.ReactNode;
};
const PageContainer: React.FC<PageContainerProps> = (props) => {

  const { 
    pageName,
    children,
    isMarkdown = false
  } = props;

  return (
    <>
      <Navbar pageName={pageName} />
      <div>
        <div className="flex justify-around">
          <div className="w-1/5"></div>
          <div className="w-3/5">
            {isMarkdown ? null : children}
          </div>
          <div className="w-1/5"></div>
        </div>
      </div>
    </>
  );
};

export default PageContainer;