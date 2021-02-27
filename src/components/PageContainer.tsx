import React from 'react';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import { usePageTracking } from '../hooks/usePageTracking';

// TODO:
// - Markdown

interface PageContainerProps {
  pageName: string;
  isMarkdown?: boolean;
  children: React.ReactNode;
};
const PageContainer: React.FC<PageContainerProps> = (props) => {

  const { pageName, children, isMarkdown = false } = props;

  usePageTracking();

  const pageTitle = `Dinogram - ${pageName}`;

  return (
    <>
      <Helmet
        title={pageTitle}
      />
      <Navbar pageName={pageName} />
      <div
        style={{
          backgroundImage: `url("/img/dirt_bg_1.jpg")` ,
        }}
      >
        <div className="flex justify-around">
          <div
            className="w-full md:w-3/5 bg-black bg-opacity-50 my-12 mx-4 px-4 rounded-lg"
          >
            {isMarkdown ? null : children}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageContainer;