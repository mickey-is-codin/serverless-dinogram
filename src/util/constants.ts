import { gql } from '@apollo/client';
import {
  GeologicInstant,
  GeologicTimelineData,
  CampaignMetadataList,
  AnnotationsData
} from './types';

export const EARLIER_DELINEATION = 'Earlier';

/* GraphQL */
export const GET_CAMPAIGN_LIST = gql`
  query GetCampaignList {
    campaignList
  }
`;

// export const GET_CAMPAIGN_HTML = gql`
//   query GetCampaignHtml($id: String!) {
//     campaignHtml(id: $id)
//   }
// `;

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

// units = 10,000 years
// Maybe convert this back to just being data BASE_TIME
export const BASE_TIMELINE_DATA: GeologicTimelineData = {
  eons: {
    name: 'eons',
    displayName: 'Eon',
    data: [
      { name: 'Phanerozoic', start: 54100, duration: 54100 },
      { name: 'Precambrian/Proterozoic', start: 250000, duration: 195900 },
      { name: 'Phanerozoic/Archean', start: 400000, duration: 150000 },
      { name: 'Phanerozoic/Hadean', start: 460000, duration: 60000 },
    ],
  },
  eras: {
    name: 'eras',
    displayName: 'Era',
    data: [
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
    ],
  },
  periods: {
    name: 'periods',
    displayName: 'Period',
    data: [
      { name: 'Quaternary', start: 258, duration: 258 },
      { name: 'Tertiary/Neogene', start: 2303, duration: 2045 },
      { name: 'Tertiary/Paleogene', start: 6600, duration: 4297 },
      { name: 'Cretaceous', start: 14500, duration: 7900 },
      { name: 'Jurassic', start: 20130, duration: 5630 },
      { name: 'Triassic', start: 25190, duration: 5060 },
      { name: 'Permian', start: 29890 , duration: 4700},
      { name: 'Carboniferous/Pennsylvanian', start: 32320, duration: 2430 },
      { name: 'Carboniferous/Mississippian', start: 35890, duration: 3570 },
      { name: 'Devonian', start: 41920, duration: 6030 },
      { name: 'Silurian', start: 44380, duration: 2460 },
      { name: 'Ordovician', start: 48540, duration: 4160 },
      { name: 'Cambrian', start: 54100, duration: 5560 },
    ],
  },
  epochs: {
    name: 'epochs',
    displayName: 'Epoch',
    data: [
      { name: 'Holocene', start: 12, duration: 12 },
      { name: 'Pleistocene', start: 258, duration: 246 },
      { name: 'Pliocene', start: 533, duration: 275 },
      { name: 'Miocene', start: 2303, duration: 1770 },
      { name: 'Oligocene', start: 3390, duration: 1087 },
      { name: 'Eocene', start: 5600, duration: 2210 },
      { name: 'Paleocene', start: 6600, duration: 1000 },
    ],
  },
};

/* MailChimp */
// units = 10,000 years
export const CAMPAIGNS_METADATA: CampaignMetadataList = {
  "Quetzalcoatlus": { start: 721000, end: 660000, previewImagePath: 'quetzalcoatlus.jpg' },
  "Titanoboa": { start: 600000, end: 580000, previewImagePath: 'titanoboa.png' },
  "Ankylosaurus": { start: 835000, end: 660000, previewImagePath: 'ankylosaurus.jpg' },
  "Andrewsarchus": { start: 450000, end: 360000, previewImagePath: 'andrewsarchus.jpg' },
  "Giganotosaurus": { start: 996000, end: 935000, previewImagePath: 'giganotosaurus.png' },
  "Brontosaurus": { start: 1573000, end: 1450000, previewImagePath: 'brontosaurus.jpg' },
  "Triceratops": { start: 835000, end: 660000, previewImagePath: 'triceratops.jpg' },
  "Spinosaurus": { start: 1120000, end: 721000, previewImagePath: 'spinosaurus.jpg' },
  "Megalodon": { start: 230000, end: 36000, previewImagePath: 'megalodon.jpg' },
  "Megatherium": { start: 400000, end: 8000, previewImagePath: 'megatherium.png' },
  "Dreadnoughtus": { start: 836000, end: 660000, previewImagePath: 'dreadnoughtus.jpg' }
};

export const OMITTED_CAMPAIGNS: string[] = [
  "b9e15d1380",
  "c9dbe8bb00",
  "ece7939082"
];

export const ANNOTATIONS: AnnotationsData = {
  0: 'Present Day',
  460000: 'Earth Formed',
};

export const TIMELINE_START_HEIGHT: number = 20;
export const DATE_OFFSET: number = 50;
export const EVENT_DIAMETER: number = 4;
export const EVENT_INNER_DIAMETER: number = EVENT_DIAMETER / 2;
export const EVENT_RADIUS: number = EVENT_DIAMETER / 2;