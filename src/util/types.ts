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

export interface GeologicDelineation {
  readonly name: string;
  readonly strataData: StratumData[];
};

export interface GeologicTimeline {
  readonly eons: GeologicDelineation;
  readonly eras: GeologicDelineation;
  readonly periods: GeologicDelineation;
  readonly epochs: GeologicDelineation;
};

export type StratumRef = React.MutableRefObject<(HTMLDivElement | null)[]>;
export type StratumDataWithRef = [
  StratumData[], 
  StratumRef
];

export interface Stratum {
  name: string;
  data: StratumData[];
  refs: StratumRef;
  scrollCallback?: (x: string) => () => void;
};
export const toStratum = (
  name: string,
  data: StratumData[],
  refs: StratumRef,
) => ({
  name,
  data,
  refs,
});

export interface Strata {
  eons: Stratum;
  eras: Stratum;
  periods: Stratum;
  epochs: Stratum;
};

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

interface CampaignResponseSettings {
  title: string;
};
export interface CampaignResponse {
  id: string;
  archive_url: string;
  long_archive_url: string;
  settings: CampaignResponseSettings;
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