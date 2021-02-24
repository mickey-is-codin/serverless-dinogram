import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';

// TODO:
// - Markdown

interface PageContainerProps {
  pageName: string;
  isMarkdown?: boolean;
  children: React.ReactNode;
};
const PageContainer: React.FC<PageContainerProps> = (props) => {

  const { pageName, children, isMarkdown = false } = props;

  const pageTitle = `Dinogram - ${pageName}`;

  useEffect(() => {
    ReactGA.initialize('UA-181946115-2');
    ReactGA.pageview(pageTitle);
  }, [pageTitle]);

  return (
    <>
      <Helmet
        title={pageTitle}
      />
      <Navbar pageName={pageName} />
      <div>
        <div className="flex justify-around">
          <div className="w-1/5"></div>
          <div className="w-3/5 bg-black bg-opacity-50 my-12 p-4 rounded-lg">
            {isMarkdown ? null : children}
          </div>
          <div className="w-1/5"></div>
        </div>
      </div>
    </>
  );
};

export default PageContainer;