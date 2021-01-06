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

export type StratumRefs = React.MutableRefObject<(HTMLDivElement | null)[]>;

export interface Delineation {
  readonly name: string;
  readonly data: StratumData[];
  readonly refs?: StratumRefs;
  readonly scrollCallback?: (x: string) => () => void;
};

export interface GeologicTimeline {
  readonly eons: Delineation;
  readonly eras: Delineation;
  readonly periods: Delineation;
  readonly epochs: Delineation;
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