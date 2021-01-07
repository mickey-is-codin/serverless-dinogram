import { useEffect, useRef } from 'react';
import {
  StratumData,
  StratumRefs,
  Delineation,
  DelineationStartData,
} from '../util/types';
import { BASE_TIMELINE_DATA } from '../util/constants';

const useStratumData = (
  delineationName: string
): DelineationStartData => BASE_TIMELINE_DATA[delineationName];

const useDelineationRefs = (strataData: StratumData[]) => {
  const refs: StratumRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    refs.current = Array.from({ length: strataData.length });
  }, [strataData, refs]);
  return refs;
};

export const useDelineation = (delineationName: string): Delineation => {
  const { name, displayName, data } = useStratumData(delineationName);
  const refs = useDelineationRefs(data);
  return { name, displayName, data, refs };
};