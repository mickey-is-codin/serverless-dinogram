import { useState, useEffect, useRef } from 'react';
import { StratumData, GeologicValueRefTuple, Strata, Stratum } from '../util/types';

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

const setupRefTriggers = (stratum: Stratum) => {
  const { refs, strata: data, scrollCallback } = stratum;
  if (!scrollCallback) return;
  refs.current.forEach((ref: any, ix: any) => {
    ScrollTrigger.create({
      trigger: ref,
      // markers: true,
      start: 'top 165px',
      end: 'bottom 165px',
      onEnter: scrollCallback(data[ix].name),
      onEnterBack: scrollCallback(data[ix].name),
    });
  });
};

export const useDelineationScrollTrigger = (strata: Strata): void => {

  useEffect(() => {
    const { eons, eras, periods, epochs } = strata;
    setupRefTriggers(eons);
    setupRefTriggers(eras);
    setupRefTriggers(periods);
    setupRefTriggers(epochs);
  }, [ strata ]);
};