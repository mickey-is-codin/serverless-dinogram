import { gql } from '@apollo/client';
import { withRefs } from './fp';
import {
  GeologicInstant,
  GeologicTimeline,
  CampaignMetadataList,
  AnnotationsData,
  DelineationNames,
} from './types';

/* GraphQL */
export const GET_CAMPAIGN_LIST = gql`
  query GetCampaignList {
    campaignList
  }
`;

/* Timeline */
export const EARTH_AGE_BILLIONS: number = 4.6;
export const EARTH_AGE_HUNDRED_MILL: number = 460;
export const EARTH_AGE_TEN_THOUSAND: number = 460000;

export const PRESENT_INSTANT = (): GeologicInstant => ({
  eon: 'Phanerozoic',
  era: 'Cenozoic',
  period: 'Quaternary',
  epoch: 'Holocene',
});

export const DNE: string = 'DNE';

// units = 10,000 years
export const BASE_TIMELINE_DATA: GeologicTimeline = {
  eon: {
    name: DelineationNames.EON,
    displayName: 'Eon',
    strata: withRefs([
      { name: 'Phanerozoic', start: 54100, duration: 54100 },
      { name: 'Precambrian / Proterozoic', start: 250000, duration: 195900 },
      { name: 'Phanerozoic / Archean', start: 400000, duration: 150000 },
      { name: 'Phanerozoic / Hadean', start: 460000, duration: 60000 },
    ]),
  },
  era: {
    name: DelineationNames.ERA,
    displayName: 'Era',
    strata: withRefs([
      { name: 'Cenozoic', start: 6600, duration: 6600 },
      { name: 'Mesozoic', start: 25190, duration: 18590 },
      { name: 'Paleozoic', start: 54100, duration: 28910 },
      { name: 'Neoproterozoic', start: 100000, duration: 45900 },
      { name: 'Mesoproterozoic', start: 160000, duration: 60000 },
      { name: 'Paleoproterozoic', start: 250000, duration: 90000 },
      { name: 'Neoarchean', start: 280000, duration: 30000 },
      { name: 'Mesoarchean', start: 320000, duration: 40000 },
      { name: 'Paleoarchean', start: 360000, duration: 40000 },
      { name: 'Eoarchean', start: 400000, duration: 40000 },
      { name: DNE, start: 460000, duration: 60000 }
    ]),
  },
  period: {
    name: DelineationNames.PERIOD,
    displayName: 'Period',
    strata: withRefs([
      { name: 'Quaternary', start: 258, duration: 258 },
      { name: 'Tertiary / Neogene', start: 2303, duration: 2045 },
      { name: 'Tertiary / Paleogene', start: 6600, duration: 4297 },
      { name: 'Cretaceous', start: 14500, duration: 7900 },
      { name: 'Jurassic', start: 20130, duration: 5630 },
      { name: 'Triassic', start: 25190, duration: 5060 },
      { name: 'Permian', start: 29890 , duration: 4700},
      { name: 'Carboniferous / Pennsylvanian', start: 32320, duration: 2430 },
      { name: 'Carboniferous / Mississippian', start: 35890, duration: 3570 },
      { name: 'Devonian', start: 41920, duration: 6030 },
      { name: 'Silurian', start: 44380, duration: 2460 },
      { name: 'Ordovician', start: 48540, duration: 4160 },
      { name: 'Cambrian', start: 54100, duration: 5560 },
      { name: DNE, start: 460000, duration: 405900 }
    ]),
  },
  epoch: {
    name: DelineationNames.EPOCH,
    displayName: 'Epoch',
    strata: withRefs([
      { name: 'Holocene', start: 12, duration: 12 },
      { name: 'Pleistocene', start: 258, duration: 246 },
      { name: 'Pliocene', start: 533, duration: 275 },
      { name: 'Miocene', start: 2303, duration: 1770 },
      { name: 'Oligocene', start: 3390, duration: 1087 },
      { name: 'Eocene', start: 5600, duration: 2210 },
      { name: 'Paleocene', start: 6600, duration: 1000 },
      { name: DNE, start: 460000, duration: 453400 }
    ]),
  },
};

/* MailChimp */
// units = 10,000 years
export const CAMPAIGNS_METADATA: CampaignMetadataList = {
  "Quetzalcoatlus": { start: 7210, end: 6600, previewImagePath: 'quetzalcoatlus.jpg' },
  "Titanoboa": { start: 6000, end: 5800, previewImagePath: 'titanoboa.png' },
  "Ankylosaurus": { start: 8350, end: 6600, previewImagePath: 'ankylosaurus.jpg' },
  "Andrewsarchus": { start: 4500, end: 3600, previewImagePath: 'andrewsarchus.jpg' },
  "Giganotosaurus": { start: 9960, end: 9350, previewImagePath: 'giganotosaurus.png' },
  "Brontosaurus": { start: 15730, end: 14500, previewImagePath: 'brontosaurus.jpg' },
  "Triceratops": { start: 8350, end: 6600, previewImagePath: 'triceratops.jpg' },
  "Spinosaurus": { start: 11200, end: 7210, previewImagePath: 'spinosaurus.jpg' },
  "Megalodon": { start: 2300, end: 360, previewImagePath: 'megalodon.jpg' },
  "Megatherium": { start: 4000, end: 80, previewImagePath: 'megatherium.png' },
  "Dreadnoughtus": { start: 8360, end: 6600, previewImagePath: 'dreadnoughtus.jpg' }
};

export const OMITTED_CAMPAIGNS: string[] = [
  "b9e15d1380",
  "c9dbe8bb00",
  "ece7939082",
  "666245f486",
];

// units = 10,000 years
export const ANNOTATIONS: AnnotationsData = {
  0: 'Present Day',
  30: 'First Homo sapiens discovered',
  100: '1 million years ago',
  3400: 'Late Cenozoic Ice Age Begins',
  6600: 'Cretaceous-Paleogene Extinction',
  20130: 'Triassic-Jurassic Extinction',
  26000: 'Karoo Ice Age Ends',
  36000: 'Karoo Ice Age Begins',
  25200: 'Permian-Triassic Extinction',
  36500: 'Late Devonian Extinction',
  42000: 'Andrean-Saharan Ice Age Begins',
  45000: 'Andrean-Saharan Ice Age Begins',
  44000: 'Ordovician-Silurian Extinction',
  58000: 'Gaskiers Ice Age Begins',
  54700: 'Baykonur Ice Age Begins',
  63500: 'Marino Ice Age Ends',
  65000: 'Marino Ice Age Begins',
  68000: 'Sturt Ice Age Ends',
  71500: 'Sturt Ice Age Begins',
  210000: 'Huron Ice Age Begins',
  240000: 'Huron Ice Age Begins',
  278000: 'Pongola Ice Age Ends',
  290000: 'Pongola Ice Age Begins',
  400000: 'Origin of life on earth',
  440000: 'Origin of watr on earth',
  460000: 'Earth Formed',
};

/* Styling */
export const TIMELINE_START_HEIGHT: number = 20;
export const DATE_OFFSET: number = 50;
export const EVENT_DIAMETER: number = 4;
export const EVENT_INNER_DIAMETER: number = EVENT_DIAMETER / 2;
export const EVENT_RADIUS: number = EVENT_DIAMETER / 2;

/* Navbar/Menu */
export const GEOLOGY_MENU_NAME = "Geology Timeline";
export const NAV_MENU_NAME = "Website Navigation";
export const DEFAULT_POPUP_CLASSNAME = "bg-black bg-opacity-50 backdrop-filter backdrop-blur-xl w-full flex-1 z-90 my-2 rounded-lg overflow-scroll";
export const ICON_SIZE = 36;
export const LOADING_TEXT = "Loading...";
export const BASE_CLASS_DEFAULT = "hover:text-bone bg-green-700 px-4 py-2 rounded-md";
export const NAV_CLOSED_CLASS_NAME = "md:invisible fixed z-90 flex flex-col w-screen px-4 py-2";
export const NAV_OPENED_CLASS_NAME = "md:invisible fixed z-90 flex flex-col w-screen h-screen px-4 py-2";