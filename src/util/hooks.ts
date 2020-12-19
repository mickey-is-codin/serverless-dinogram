import { useState, useEffect, useRef } from 'react';
import { GeologicStratum, GeologicValueRefTuple } from '../util/types';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const useDelineationRefArray = (
  eons: GeologicStratum[]
): GeologicValueRefTuple => {
  
  const [delineationData, setDelineationData] = useState<GeologicStratum[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    refs.current = Array.from({ length: eons.length });
    setDelineationData(eons);
  }, [eons, refs, setDelineationData]);

  return [delineationData, refs];
};

const setupRefTriggers = (stratum: any, onEnter: any) => {
  const [ data, refs ] = stratum;
  refs.current.forEach((ref: any, ix: any) => {
    ScrollTrigger.create({
      trigger: ref,
      // markers: true,
      start: 'top 165px',
      end: 'bottom 165px',
      onEnter: onEnter(data[ix].name),
      onEnterBack: onEnter(data[ix].name),
    });
  });
};

interface ScrollTriggerProps {
  eons: GeologicValueRefTuple;
  eras: GeologicValueRefTuple;
  periods: GeologicValueRefTuple;
  epochs: GeologicValueRefTuple;
  enterCallbacks: any;
};
export const useDelineationScrollTrigger = (props: ScrollTriggerProps): void => {

  const { eons, eras, periods, epochs, enterCallbacks } = props;

  useEffect(() => {

    const { onEonEnter, onEraEnter, onPeriodEnter, onEpochEnter } = enterCallbacks;

    setupRefTriggers(eons, onEonEnter);
    setupRefTriggers(eras, onEraEnter);
    setupRefTriggers(periods, onPeriodEnter);
    setupRefTriggers(epochs, onEpochEnter);

  }, [ eons, eras, periods, epochs, enterCallbacks ]);
};