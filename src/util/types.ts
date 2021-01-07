/* GEOLOGY TYPES */
export interface GeologicInstant {
  [key: string]: string;
};

export interface StratumData {
  readonly name: string;
  readonly start: number;
  readonly duration: number;
};

export type StratumRefs = React.MutableRefObject<(HTMLDivElement | null)[]>;

export interface Delineation {
  readonly name: string;
  readonly displayName: string;
  readonly data: StratumData[];
  readonly refs: StratumRefs;
};

export interface DelineationStartData {
  readonly name: string;
  readonly displayName: string;
  readonly data: StratumData[];
};

export interface GeologicTimelineData {
  readonly [key: string]: DelineationStartData;
};

export interface GeologicTimeline {
  readonly [key: string]: Delineation;
};

export interface ScrollCallbackSignatures {
  readonly [key: string]: (x: string) => () => void;
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