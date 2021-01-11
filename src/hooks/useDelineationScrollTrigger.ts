import { useEffect } from 'react';
import {
  ScrollCallbackSignatures,
  Delineation,
  GeologicTimeline,
} from '../util/types';
import { isLast, noop } from '../util/fp';
import { EARLIER_DELINEATION } from '../util/constants';
import ScrollTrigger from 'gsap/ScrollTrigger';

const toRefTriggerSetup = (
  enterCallbacks: ScrollCallbackSignatures
) => (
  delineation: Delineation
) => {
  const { name, refs, data } = delineation;
  const scrollCallback = enterCallbacks[name];
  if (!refs) return;
  const isLastRef = isLast(refs.current);
  if (!scrollCallback) return;
  if (!refs.current.length) return;
  refs.current.forEach((ref: any, ix: any) => {
    ScrollTrigger.create({
      trigger: ref,
      // markers: true,
      start: 'top 165px',
      end: 'bottom 165px',
      onEnter: scrollCallback(data[ix].name),
      onEnterBack: scrollCallback(data[ix].name),
      onLeave: isLastRef(ix) ? scrollCallback(EARLIER_DELINEATION) : noop
    });
  });
};

export const useDelineationScrollTrigger = (
  timeline: GeologicTimeline,
  enterCallbacks: ScrollCallbackSignatures
): void => {
  useEffect(() => {
    const setupRefTriggers = toRefTriggerSetup(enterCallbacks);
    const { eons, eras, periods, epochs } = timeline;
    if (ScrollTrigger.getAll().length) return;
    setupRefTriggers(eons);
    setupRefTriggers(eras);
    setupRefTriggers(periods);
    setupRefTriggers(epochs);
  }, [ timeline, enterCallbacks ]);
};