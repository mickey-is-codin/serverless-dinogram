import React, { useState, useRef } from 'react';

import { 
  Campaign,
  CampaignList,
  CampaignsByDate,
} from '../util/types';
import { toCampaignsByDate } from '../util/mailchimp';

import '../styles/tailwind.output.css';
import '../styles/timeline.css';
import { DATE_OFFSET } from '../util/constants';

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
        className="absolute z-90"
        style={{
          top: `${date + DATE_OFFSET}vh`
        }}
        key={`${rawDate}-campaigns`}
      >
        <div
          className="text-bone text-xl z-90 mx-12 py-12 md:flex flex-col text-left md:justify-around"
        >
          {campaignsByEnd[date].map((campaign: Campaign) =>
            <div
              className="text-center my-12 bg-brown-900 px-4 py-2 rounded-md"
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
            className="z-90 flex justify-around m-8 rounded-md"
          >
            <img 
              src={`img/${imageData}`} alt={`${imageData}`}
              className="rounded-md"
            />
          </div>
        ) : null}
      </div>
    );
    return [...acc, listItems];
  }, []).flat();

  return (
    <div className="z-90">
      {campaignTimeline}
    </div>
  );
};

export default CampaignsTimeline;