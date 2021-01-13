import React from 'react';
import Navbar from './Navbar';
import { TimelineLayer } from './TimelineLayer';
import BaseTimelineLayer from './BaseTimelineLayer';
import ElapsedTimelineLayer from './ElapsedTimelineLayer';
import CampaignsTimeline from './CampaignsTimeline';
import TimeSidebar from './TimeSidebar';
import Annotations from './Annotations';
import ArticleSidebar from './ArticleSidebar';
import { PageNames } from '../util/types';
import { useTimeline } from '../hooks/useTimeline';
import { useCampaignList } from '../hooks/useCampaignList';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// TODO: Avoid article overlap
// Idea: Put a flexbox at each start year 
// Every time we add a campaign
// we check if there is an existing div at that year
// if there is, just add it in
// if not, make a new div and add the article

// Or we even just do the setup ahead of time
// Get a unique list of all start dates from the metadata
// and use that to set up an object of divs
// Then that guarantees there will be a div at that location

// TODO: Chrono sort article sidebar
// TODO: Skinnier timeline
// TODO: (Stretch) General look overhaul

const Timeline: React.FC = () => {

  const timeline = useTimeline();
  const campaignList = useCampaignList();

  return (
    <div className="text-center">
      <Navbar pageName={PageNames.Timeline} />
      <TimeSidebar timeline={timeline} />
      <ArticleSidebar campaignList={campaignList} />
      <h1 className="text-3xl text-bone py-3">
        A Tour Through the Earth
      </h1>
      {/* <BaseTimelineStart />
      <div className="relative flex justify-center">
        <BaseTimelineLayer />
        <TimelineLayer data={timeline.eons} />
        <TimelineLayer data={timeline.eras} />
        <TimelineLayer data={timeline.periods} />
        <TimelineLayer data={timeline.epochs} />
        <Annotations />
      </div>
      <CampaignsTimeline campaignList={campaignList} />
      <ArticleSidebar campaignList={campaignList} /> */}

      <BaseTimelineLayer />
      <ElapsedTimelineLayer />
      <Annotations />
      <TimelineLayer data={timeline.eons} />
      <TimelineLayer data={timeline.eras} />
      <TimelineLayer data={timeline.periods} />
      <TimelineLayer data={timeline.epochs} />
      {/* <CampaignsTimeline campaignList={campaignList} /> */}
    </div>
  );
};

export default Timeline;