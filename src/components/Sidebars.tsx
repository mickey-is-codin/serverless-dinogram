import React from 'react';
import TimeSidebar from './TimeSidebar';
import ArticleSidebar from './ArticleSidebar';
import { CampaignList, GeologicTimeline } from '../util/types';

interface SidebarsProps {
  timeline: GeologicTimeline;
  campaignList: CampaignList;
};
export const Sidebars: React.FC<SidebarsProps> = (props) => {
  const { timeline, campaignList } = props;
  return (
    <div
      className="fixed right-0 px-4 z-90 h-full flex flex-col bg-red-400 w-1/2"
    >
      <ArticleSidebar campaignList={campaignList} />
      <TimeSidebar timeline={timeline} />
    </div>
  )
};
export default Sidebars;