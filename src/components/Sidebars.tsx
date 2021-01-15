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
    <>
      <ArticleSidebar campaignList={campaignList} />
      <TimeSidebar timeline={timeline} />
    </>
  )
};
export default Sidebars;