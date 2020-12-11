import { GeologicInstant, GeologicTimeline } from '../util/types';

export const EARTH_AGE_HUNDRED_MILL: number = 460;
export const EARTH_AGE_TEN_THOUSAND: number = 460000;

export const toPresentInstant = (): GeologicInstant => ({
  eon: 'Phanerozoic',
  era: 'Cenozoic',
  period: 'Quaternary',
  epoch: 'Holocene',
});

// start units = 10,000 years (to remove decimals)
export const toTimelineData = (): GeologicTimeline => {
  return {
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
      { name: 'Earlier', start: 460000, duration: 60000 },
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
      { name: 'Earlier', start: 460000, duration: 405900 },
    ],
    epochs: [
      { name: 'Holocene', start: 12, duration: 12 },
      { name: 'Pleistocene', start: 258, duration: 246 },
      { name: 'Pliocene', start: 533, duration: 275 },
      { name: 'Miocene', start: 2303, duration: 1770 },
      { name: 'Oligocene', start: 3390, duration: 1087 },
      { name: 'Eocene', start: 5600, duration: 2210 },
      { name: 'Paleocene', start: 6600, duration: 1000 },
      { name: 'Earlier', start: 460000, duration: 453400 },
    ],
  };
};