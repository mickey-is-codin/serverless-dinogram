import { useEffect } from 'react';
import {
  DelineationScrollCallbacks,
  Delineation,
  ScrollCallback,
  Stratum,
} from '../util/types';
import { noop } from '../util/fp';
import { BASE_TIMELINE_DATA } from '../util/constants';
import ScrollTrigger from 'gsap/ScrollTrigger';

const toRefTriggerSetup = (
  enterCallbacks: DelineationScrollCallbacks
) => (
  delineation: Delineation
): void => {
  const { name, strata } = delineation;
  const scrollCallback: ScrollCallback = enterCallbacks[name];
  strata.forEach((stratum: Stratum) => {
    const { name, ref: { current } } = stratum;
    if (!current) return;
    ScrollTrigger.create({
      trigger: current,
      start: "top 165 px",
      end: "bottom 165 px",
      onEnter: scrollCallback(name),
      onEnterBack: scrollCallback(name),
      onLeave: noop,
    });
  });
};

export const useDelineationScrollTrigger = (
  enterCallbacks: DelineationScrollCallbacks
): void => {
  useEffect(() => {
    const setupRefTriggers = toRefTriggerSetup(enterCallbacks);
    const { eon, era, period, epoch } = BASE_TIMELINE_DATA;
    if (ScrollTrigger.getAll().length) return;
    setupRefTriggers(eon);
    setupRefTriggers(era);
    setupRefTriggers(period);
    setupRefTriggers(epoch);
  }, [ enterCallbacks ]);
};