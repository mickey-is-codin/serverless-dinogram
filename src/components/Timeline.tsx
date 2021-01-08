import React from 'react';
import Navbar from './Navbar';
import { TimelineStart, TimelineBody } from './BaseTimeline';
import { GeologicDelineation } from './GeologicDelineation';
import CampaignsTimeline from './CampaignsTimeline';
import TimeSidebar from './TimeSidebar';
import ArticleSidebar from './ArticleSidebar';
import { PageNames } from '../util/types';
import { useTimeline } from '../hooks/useTimeline';
import { useCampaignList } from '../hooks/useCampaignList';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// TODO: Chrono sort article sidebar
// Avoid article overlap

const Timeline: React.FC = () => {

  const timeline = useTimeline();
  const campaignList = useCampaignList();

  return (
    <div className="text-center">
      <Navbar pageName={PageNames.Timeline} />
      <TimeSidebar timeline={timeline} />
      <h1 className="text-3xl text-bone">
        A Tour Through the Earth
      </h1>
      <TimelineStart />
      <div className="relative flex justify-center">
        <TimelineBody />
        <GeologicDelineation data={timeline.eons} />
        <GeologicDelineation data={timeline.eras} />
        <GeologicDelineation data={timeline.periods} />
        <GeologicDelineation data={timeline.epochs} />
      </div>
      <CampaignsTimeline campaignList={campaignList} />
      <ArticleSidebar campaignList={campaignList} />
    </div>
  );
};

export default Timeline;