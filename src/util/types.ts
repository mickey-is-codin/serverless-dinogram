/* GEOLOGY TYPES */
export interface GeologicInstant {
  readonly eon: string;
  readonly era: string;
  readonly period: string;
  readonly epoch: string;
};

export interface StratumData {
  readonly name: string;
  readonly start: number;
  readonly duration: number;
};

export interface GeologicTimeline {
  readonly eons: StratumData[];
  readonly eras: StratumData[];
  readonly periods: StratumData[];
  readonly epochs: StratumData[];
};

export type GeologicValueRefTuple = [
  StratumData[], 
  React.MutableRefObject<(HTMLDivElement | null)[]>
];

// strata->data prop maybe?
export interface Stratum {
  name: string;
  data: StratumData[];
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  scrollCallback?: (x: string) => () => void;
};

export interface Strata {
  eons: Stratum;
  eras: Stratum;
  periods: Stratum;
  epochs: Stratum;
};

export const toStratum = (
  name: string,
  data: StratumData[],
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => ({
  name,
  data,
  refs,
});

export interface ScrollCallbackSignatures {
  onEonEnter: (x: string) => () => void;
  onEraEnter: (x: string) => () => void;
  onPeriodEnter: (x: string) => () => void;
  onEpochEnter: (x: string) => () => void;
};

/* NAV/APP TYPES */
export enum PageNames {
  Home = "HOME",
  People = "PEOPLE",
  About = "ABOUT",
  Timeline = "TIMELINE",
};

export interface PageTextProps {
  baseClasses: string;
};

/* API TYPES */
export interface CampaignListResponse {
  campaignList: string;
};
export interface CampaignHtmlResponse {
  campaignHtml: string;
};

export interface Campaign {
  id: string;
  title: string;
  archiveUrl?: string;
  longArchiveUrl?: string;
  start?: number;
  end?: number;
  ref?: any;
};
export type CampaignList = Campaign[];

export interface CampaignMetadata {
  title: string;
  start: number;
  end: number;
};
export type CampaignMetadataList = CampaignMetadata[];