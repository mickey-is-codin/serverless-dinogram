import React from 'react';

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
  Home = "Home",
  People = "People",
  About = "About",
  Contact = "Contact",
  Timeline = "Timeline",
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
  archiveUrl: string;
  longArchiveUrl: string;
  start: number;
  end: number;
  previewImagePath: string;
  ref: any;
};
export type CampaignList = Campaign[];

export interface CampaignMetadata {
  start: number;
  end: number;
  previewImagePath: string;
};
export interface CampaignMetadataList {
  [key: string]: CampaignMetadata;
};

export interface CampaignsByDate {
  [key: number]: Campaign[];
};

export interface AnnotationsData {
  [key: string]: string;
};

export interface RouteMap {
  [key: string]: React.LazyExoticComponent<React.ComponentType>;
};

export interface PageRoute {
  route: string;
  componentPath: string;
};

export type LazyImport = React.LazyExoticComponent<React.ComponentType>;