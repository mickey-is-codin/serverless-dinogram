import React, { useState, useRef } from 'react';

import { 
  Campaign,
  CampaignList,
  CampaignsByDate,
} from '../util/types';
import { toCampaignsByDate } from '../util/mailchimp';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';

interface CampaignListItemProps {
  campaign: Campaign;
};
const CampaignListItem: React.FC<CampaignListItemProps> = (props) => {

  const { campaign } = props;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div ref={campaign.ref = ref}>
      <a 
        href={campaign.longArchiveUrl}
        className="hover:text-orange-700"
      >
        {campaign.title}
      </a>
    </div>
  );
};

interface CampaignsTimelineProps {
  campaignList: CampaignList;
};
const CampaignsTimeline: React.FC<CampaignsTimelineProps> = (props) => {

  const { campaignList } = props;

  const [ imageData, setImageData ] = useState<string>('');

  if (!campaignList.length) return <></>;

  const campaignsByEnd: CampaignsByDate = toCampaignsByDate('end')(campaignList);

  const campaignTimeline = Object.keys(campaignsByEnd).reduce((acc: any, rawDate: string) => {
    const date = parseInt(rawDate);
    const listItems = (
      <div
        className="absolute z-90 w-full"
        style={{
          top: `${date / 100}vh`
        }}
        key={`${rawDate}-campaigns`}
      >
        <div
          className="text-blue-900 text-2xl z-90 mx-auto flex justify-around"
        >
          {campaignsByEnd[date].map((campaign: Campaign) =>
            <div
              onMouseEnter={() => setImageData(campaign.previewImagePath)}
              onMouseLeave={() => setImageData('')}
              key={`${campaign.title}-${campaign.end}`}
            >
              <CampaignListItem
                campaign={campaign}
              />
            </div>
          )}
        </div>
        {imageData ? (
          <div
            className="z-90 flex justify-around"
          >
            <img src={`img/${imageData}`} alt={`${imageData}`}/>
          </div>
        ) : null}
      </div>
    );
    return [...acc, listItems];
  }, []).flat();

  return (
    <div className="z-90">
      {/* {campaignList.map((campaign, ix) => 
        <CampaignListItem 
          campaign={campaign}
          key={`${campaign.title}-${campaign.start}-${ix}`}
        />
      )} */}
      {campaignTimeline}
    </div>
  );
};

export default CampaignsTimeline;