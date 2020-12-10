export const EARTH_AGE_HUNDRED_MILL = 460;

export const toPresentTime = () => ({
  eon: 'Phanerozoic',
  era: 'Cenozoic',
  period: 'Quaternary',
  epoch: 'Holocene',
});

// start units = 10,000 years
export const toTimelineData = () => {
  return {
    eons: [
      { name: 'Phanerozoic', start: 54100 },
      { name: 'Precambrian/Proterozoic', start: 250000 },
      { name: 'Phanerozoic/Archean', start: 400000 },
      { name: 'Phanerozoic/Hadean', start: 460000 },
    ],
    eras: [
      { name: 'Cenozoic', start: 6600 },
      { name: 'Mesozoic', start: 25190 },
      { name: 'Paleozoic', start: 54100 },
      { name: 'Neoproterozoic', start: 100000 },
      { name: 'Mesoproterozoic', start: 160000 },
      { name: 'Paleoproterozoic', start: 250000 },
      { name: 'Neoarchean', start: 280000 },
      { name: 'Mesoarchean', start: 320000 },
      { name: 'Paleoarchean', start: 360000 },
      { name: 'Eoarchean', start: 400000 },
      { name: 'Earlier', start: 460000 },
    ],
    periods: [
      { name: 'Quaternary', start: 258 },
      { name: 'Tertiary/Neogene', start: 23030 },
      { name: 'Tertiary/Paleogene', start: 6600 },
      { name: 'Cretaceous', start: 14500 },
      { name: 'Jurassic', start: 20130 },
      { name: 'Triassic', start: 25190 },
      { name: 'Permian', start: 29890 },
      { name: 'Carboniferous/Pennsylvanian', start: 32320 },
      { name: 'Carboniferous/Mississippian', start: 35890 },
      { name: 'Devonian', start: 41920 },
      { name: 'Silurian', start: 44380 },
      { name: 'Ordovician', start: 48540 },
      { name: 'Cambrian', start: 54100 },
      { name: 'Earlier', start: 460000 },
    ],
    epochs: [
      { name: 'Holocene', start: 12 },
      { name: 'Pleistocene', start: 258 },
      { name: 'Pliocene', start: 533 },
      { name: 'Miocene', start: 2303 },
      { name: 'Oligocene', start: 3390 },
      { name: 'Eocene', start: 5600 },
      { name: 'Paleocene', start: 6600 },
    ],
  };
};