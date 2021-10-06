import React from 'react';

// Time split into 4 Delineations:
//   - Eons
//   - Eras
//   - Periods
//   - Epochs

// Each Delineation is made up of multiple Stratum(s)/Strata

// So, for example:
//    Eons: Delination
//    Phanerozoic: Stratum

export type ScrollCallback = (x: string) => () => void;

/* GEOLOGY TYPES */
export enum DelineationNames {
  EON = "eon",
  ERA = "era",
  PERIOD = "period",
  EPOCH = "epoch",
};

export type StratumRef = React.MutableRefObject<(HTMLDivElement | null)>;
export type RawStratum = {
  readonly name: string;
  readonly start: number;
  readonly duration: number;
};
export interface Stratum extends RawStratum {
  ref: StratumRef;
};

export interface Delineation {
  readonly name: DelineationNames;
  readonly displayName: string;
  readonly strata: Stratum[];
};

export type GeologicInstant = {
  readonly [key in DelineationNames]: string;
};

export type GeologicTimeline = {
  readonly [key in DelineationNames]: Delineation;
};

export type DelineationScrollCallbacks = {
  readonly [key in DelineationNames]: ScrollCallback;
};

/* NAV/APP TYPES */
export enum PageNames {
  HOME = "Home",
  PEOPLE = "People",
  ABOUT = "About",
  CONTACT = "Contact",
  TIMELINE = "Timeline",
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
  name: string;
  description: string;
  route: string;
  componentPath: string;
};

export type LazyImport = React.LazyExoticComponent<React.ComponentType>;

export interface NavMenuItem {
  name: string;
  route: string;
};