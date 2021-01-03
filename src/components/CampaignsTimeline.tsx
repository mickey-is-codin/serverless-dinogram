import React from 'react';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

import { CampaignList } from '../util/types';

const toCampaignListItem = (campaign: any, ix: any) => {
  const baseClasses = "text-brown-900 text-2xl absolute z-90 w-full mx-auto flex justify-around";
  const classNames=`${baseClasses}`;
  return (
    <div 
      className={classNames}
      style={{
        top: `${campaign.start / 100}vh`
      }}
      key={`${campaign.title}-${campaign.start}-${ix}`}
    >
      <div className="">
        <a 
          href={campaign.longArchiveUrl}
          className="hover:text-orange-700"
        >
          {campaign.title}
        </a>
      </div>
    </div>
  );
};

interface CampaignsTimelineProps {
  campaignList: CampaignList;
};
const CampaignsTimeline: React.FC<CampaignsTimelineProps> = (props) => {

  const { campaignList } = props;

  return (
    <div className="z-90">
      {campaignList.map(toCampaignListItem)}
    </div>
  );
};

export default CampaignsTimeline;