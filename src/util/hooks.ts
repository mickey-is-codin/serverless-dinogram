import { useState, useEffect, useRef } from 'react';
import { StratumData, GeologicValueRefTuple, Strata, Stratum, ScrollCallbackSignatures } from '../util/types';
import { isLast, noop } from '../util/fp';
import { EARLIER_DELINEATION } from '../util/constants';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const useDelineationRefArray = (
  eons: StratumData[]
): GeologicValueRefTuple => {
  
  const [delineationData, setDelineationData] = useState<StratumData[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    refs.current = Array.from({ length: eons.length });
    setDelineationData(eons);
  }, [eons, refs, setDelineationData]);

  return [delineationData, refs];
};

const toAddCallbacks = (
  strata: Strata,
  enterCallbacks: ScrollCallbackSignatures
) => {
  const { eons, eras, periods, epochs } = strata;
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

const setupRefTriggers = (stratum: Stratum) => {
  const { refs, data, scrollCallback } = stratum;
  const isLastRef = isLast(refs.current);
  if (!scrollCallback) return;
  if (!refs.current.length) return;
  console.log('setting up triggers');
  refs.current.forEach((ref: any, ix: any) => {
    ScrollTrigger.create({
      trigger: ref,
      // markers: true,
      start: 'top 165px',
      end: 'bottom 165px',
      onEnter: scrollCallback(data[ix].name),
      onEnterBack: scrollCallback(data[ix].name),
      onLeave: isLastRef(ix) ? () => scrollCallback(EARLIER_DELINEATION) : noop
    });
  });
  return true;
};

export const useDelineationScrollTrigger = (
  strata: Strata,
  enterCallbacks: ScrollCallbackSignatures
): void => {
  const strataWithCallbacks: Strata = toAddCallbacks(strata, enterCallbacks);
  useEffect(() => {
    const { eons, eras, periods, epochs } = strataWithCallbacks;
    if (ScrollTrigger.getAll().length) return;
    setupRefTriggers(eons);
    setupRefTriggers(eras);
    setupRefTriggers(periods);
    setupRefTriggers(epochs);
  }, [ strataWithCallbacks ]);
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