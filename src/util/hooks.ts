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

export const useDelineationScrollTrigger = (
  eons: GeologicValueRefTuple,
  eras: GeologicValueRefTuple,
  periods: GeologicValueRefTuple,
  epochs: GeologicValueRefTuple,
  enterCallbacks: any,
): void => {

  useEffect(() => {

    const [ eonsData, eonRefs ] = eons;
    const [ erasData, eraRefs ] = eras;
    const [ periodsData, periodRefs ] = periods;
    const [ epochsData, epochRefs ] = epochs;
    const { onEonEnter, onEraEnter, onPeriodEnter, onEpochEnter } = enterCallbacks;

    eonRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onEonEnter(eonsData[ix].name),
        onEnterBack: onEonEnter(eonsData[ix].name),
      });
    });

    eraRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onEraEnter(erasData[ix].name),
        onEnterBack: onEraEnter(erasData[ix].name),
      });
    });

    periodRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onPeriodEnter(periodsData[ix].name),
        onEnterBack: onPeriodEnter(periodsData[ix].name),
      });
    });

    epochRefs.current.forEach((ref: any, ix: any) => {
      ScrollTrigger.create({
        trigger: ref,
        // markers: true,
        start: 'top 165px',
        end: 'bottom 165px',
        onEnter: onEpochEnter(epochsData[ix].name),
        onEnterBack: onEpochEnter(epochsData[ix].name),
      });
    });
  }, [ eons, eras, periods, epochs, enterCallbacks ]);
};