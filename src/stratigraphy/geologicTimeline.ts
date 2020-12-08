export const EARTH_AGE_HUNDRED_MILL = 460;

export const toTimelineData = () => {
  return {
    eons: [
      {
        name: 'phanerozoic',
        startYearsAgo: 1000,
        endYearsAgo: 0
      }
    ],
    eras: [
      {
        name: 'caenozoic',
        startYearsAgo: 500,
        endYearsAgo: 0
      }
    ],
    periods: [
      {
        name: 'quaternary',
        startYearsAgo: 100,
        endYearsAgo: 0
      }
    ],
  };
};