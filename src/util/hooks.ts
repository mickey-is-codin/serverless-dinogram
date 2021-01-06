import { useState, useEffect, useRef } from 'react';
import {
  StratumData,
  ScrollCallbackSignatures,
  StratumRefs,
  Delineation,
  GeologicTimeline
} from '../util/types';
import { isLast, noop } from '../util/fp';
import { EARLIER_DELINEATION } from '../util/constants';
import useScrollPosition from '@react-hook/window-scroll';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const useDelineationWithRefs = (
  delineation: Delineation
): Delineation => {

  const { name, data: strataData } = delineation;
  
  const [delineationData, setDelineationData] = useState<StratumData[]>([]);
  const refs: StratumRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    refs.current = Array.from({ length: strataData.length });
    setDelineationData(strataData);
  }, [strataData, refs, setDelineationData]);

  const delineationWithRefs: Delineation = {
    name,
    data: delineationData,
    refs,
  };

  // return toStratum(name, delineationData, refs);
  return delineationWithRefs;
};

const toAddCallbacks = (
  timeline: GeologicTimeline,
  enterCallbacks: ScrollCallbackSignatures
) => {
  const { eons, eras, periods, epochs } = timeline;
  const { onEonEnter, onEraEnter, onPeriodEnter, onEpochEnter } = enterCallbacks;
  return {
    eons: {
      ...eons,
      scrollCallback: onEonEnter
    },
    eras: {
      ...eras,
      scrollCallback: onEraEnter
    },
    periods: {
      ...periods,
      scrollCallback: onPeriodEnter
    },
    epochs: {
      ...epochs,
      scrollCallback: onEpochEnter
    },
  }
};

const setupRefTriggers = (delineation: Delineation) => {
  const { refs, data, scrollCallback } = delineation;
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
  const timelineWithCallbacks: GeologicTimeline = toAddCallbacks(timeline, enterCallbacks);
  useEffect(() => {
    const { eons, eras, periods, epochs } = timelineWithCallbacks;
    if (ScrollTrigger.getAll().length) return;
    setupRefTriggers(eons);
    setupRefTriggers(eras);
    setupRefTriggers(periods);
    setupRefTriggers(epochs);
  }, [ timelineWithCallbacks ]);
};

export const useCurrentTimeMount = () => {
  useEffect(() => {
    // on mount
    return () => {
      // on unmount
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {			
        trigger.kill();
      });
    };
  }, []);
};

const withCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const toScrollPositionAsYear = (x: number): string => 
  withCommas(Math.floor(x / window.innerHeight * 100 * 10000));
export const useYearScroller = () => 
  toScrollPositionAsYear(useScrollPosition());