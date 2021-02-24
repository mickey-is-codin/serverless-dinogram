import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebars from '../../components/Sidebars';
import {
  BaseTimelineLayer,
  ElapsedTimelineLayer,
  TimelineLayer
} from '../../components/TimelineLayers'
import CampaignsTimeline from '../../components/CampaignsTimeline';
import Annotations from '../../components/Annotations';
import { PageNames } from '../../util/types';
import { useTimeline } from '../../hooks/useTimeline';
import { useCampaignList } from '../../hooks/useCampaignList';
import { Helmet } from 'react-helmet';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Timeline: React.FC = () => {

  const timeline = useTimeline();
  const campaignList = useCampaignList();

  return (
    <div className="text-center">
      <Helmet
        title={'Dinogram - Timeline'}
      />
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