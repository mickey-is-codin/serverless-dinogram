import { gql } from '@apollo/client';
import {
  GeologicInstant,
  GeologicTimeline,
  CampaignMetadata
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
export const BASE_TIMELINE: GeologicTimeline = {
  eons: [
    { name: 'Phanerozoic', start: 54100, duration: 54100 },
    { name: 'Precambrian/Proterozoic', start: 250000, duration: 195900 },
    { name: 'Phanerozoic/Archean', start: 400000, duration: 150000 },
    { name: 'Phanerozoic/Hadean', start: 460000, duration: 60000 },
  ],
  eras: [
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
  periods: [
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
  epochs: [
    { name: 'Holocene', start: 12, duration: 12 },
    { name: 'Pleistocene', start: 258, duration: 246 },
    { name: 'Pliocene', start: 533, duration: 275 },
    { name: 'Miocene', start: 2303, duration: 1770 },
    { name: 'Oligocene', start: 3390, duration: 1087 },
    { name: 'Eocene', start: 5600, duration: 2210 },
    { name: 'Paleocene', start: 6600, duration: 1000 },
  ],
};

/* MailChimp */
// units = 10,000 years
export const CAMPAIGNS_METADATA: CampaignMetadata[] = [
  { title: "Quetzalcoatlus", start: 721000, end: 660000 },
  { title: "Titanoboa", start: 600000, end: 580000 },
  { title: "Ankylosaurus", start: 835000, end: 660000 },
  { title: "Andrewsarchus", start: 450000, end: 360000 },
  { title: "Giganotosaurus", start: 996000, end: 935000 },
  { title: "Brontosaurus", start: 1573000, end: 1450000 },
  { title: "Triceratops", start: 835000, end: 660000 },
  { title: "Spinosaurus", start: 1120000, end: 721000 },
  { title: "Megalodon", start: 230000, end: 36000 },
  { title: "Megatherium", start: 400000, end: 8000 },
  { title: "Dreadnoughtus", start: 836000, end: 660000 }
];

export const OMITTED_CAMPAIGNS: string[] = ["b9e15d1380", "c9dbe8bb00"];