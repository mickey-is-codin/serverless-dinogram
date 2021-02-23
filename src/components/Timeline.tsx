import React from 'react';
import Navbar from './Navbar';
import Sidebars from './Sidebars';
import TimelineLayer from './TimelineLayer';
import BaseTimelineLayer from './BaseTimelineLayer';
import ElapsedTimelineLayer from './ElapsedTimelineLayer';
import CampaignsTimeline from './CampaignsTimeline';
import Annotations from './Annotations';
import { PageNames } from '../util/types';
import { useTimeline } from '../hooks/useTimeline';
import { useCampaignList } from '../hooks/useCampaignList';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Timeline: React.FC = () => {

  const timeline = useTimeline();
  const campaignList = useCampaignList();

  return (
    <div className="text-center">
      <Navbar pageName={PageNames.Timeline} />
      <h1 className="text-3xl text-bone py-3">
        A Tour Through the Earth
      </h1>
      <Sidebars timeline={timeline} campaignList={campaignList} />
      <BaseTimelineLayer />
      <ElapsedTimelineLayer />
      <Annotations />
      <TimelineLayer data={timeline.eons} />
      <TimelineLayer data={timeline.eras} />
      <TimelineLayer data={timeline.periods} />
      <TimelineLayer data={timeline.epochs} />
      <CampaignsTimeline campaignList={campaignList} />
    </div>
  );
};

export default Timeline;