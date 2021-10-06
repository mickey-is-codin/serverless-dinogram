import React from 'react';
import Navbar from '../../components/Navbar';
import {
  BaseTimelineLayer,
  ElapsedTimelineLayer,
  TimelineLayer
} from '../../components/TimelineLayers'
import CampaignsTimeline from '../../components/CampaignsTimeline';
import Annotations from '../../components/Annotations';
import { DelineationNames, PageNames } from '../../util/types';
import { useCampaignList } from '../../hooks/useCampaignList';
import { Helmet } from 'react-helmet';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePageTracking } from '../../hooks/usePageTracking';
import { BASE_TIMELINE_DATA } from '../../util/constants';
import TimeSidebar from '../../components/TimeSidebar';
gsap.registerPlugin(ScrollTrigger);

const Timeline: React.FC = () => {

  usePageTracking();
  const campaignList = useCampaignList();

  return (
    <div className="text-center">
      <Helmet
        title={'Dinogram - Timeline'}
      />
      <Navbar pageName={PageNames.Timeline} campaignList={campaignList} />
      <h1 className="text-3xl text-bone py-3 z-90">
        A Tour Through the Earth
      </h1>
      <TimeSidebar />
      <BaseTimelineLayer />
      <ElapsedTimelineLayer />
      <Annotations />
      <TimelineLayer data={BASE_TIMELINE_DATA[DelineationNames.EON]} />
      <TimelineLayer data={BASE_TIMELINE_DATA[DelineationNames.ERA]} />
      <TimelineLayer data={BASE_TIMELINE_DATA[DelineationNames.EPOCH]} />
      <TimelineLayer data={BASE_TIMELINE_DATA[DelineationNames.PERIOD]} />
      <CampaignsTimeline campaignList={campaignList} />
    </div>
  );
};

export default Timeline;