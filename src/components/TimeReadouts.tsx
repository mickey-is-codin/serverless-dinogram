import React, { useState } from 'react';
import { 
  GeologicInstant,
  DelineationScrollCallbacks,
} from '../util/types';
import { DNE, PRESENT_INSTANT } from '../util/constants';

import { useCurrentTimeMount } from '../hooks/useCurrentTimeMount';
import { useDelineationScrollTrigger } from '../hooks/useDelineationScrollTrigger';
import { useYearScroller } from '../hooks/useYearScroller';

export const CurrentYear: React.FC = () => {
  const currentYear = useYearScroller();
  const currentYearDisplay = `Years in the past: ${currentYear}`;
  return <div>{currentYearDisplay}</div>;
};

interface CurrentTimeProps {
};
export const CurrentTime: React.FC<CurrentTimeProps> = () => {

  useCurrentTimeMount();

  const [ currentInstant ] = useState<GeologicInstant>(PRESENT_INSTANT);

  const [ eon, setEon ] = useState<string>(currentInstant.eon);
  const [ era, setEra ] = useState<string>(currentInstant.era);
  const [ period, setPeriod ] = useState<string>(currentInstant.period);
  const [ epoch, setEpoch ] = useState<string>(currentInstant.epoch);

  const enterCallbacks: DelineationScrollCallbacks = {
    eon: (newEon: string) => () => setEon(newEon),
    era: (newEra: string) => () => setEra(newEra),
    period: (newPeriod: string) => () => setPeriod(newPeriod),
    epoch: (newEpoch: string) => () => setEpoch(newEpoch),
  };

  useDelineationScrollTrigger(enterCallbacks);

  const eonText: string = eon === DNE ? "" : `Eon: ${eon}`;
  const eraText: string = era === DNE ? "" : `Era: ${era}`;
  const periodText: string = period === DNE ? "" : `Period: ${period}`;
  const epochText: string = epoch === DNE ? "" : `Epoch: ${epoch}`;

  return (
    <div>
      <p>{eonText}</p>
      <p>{eraText}</p>
      <p>{periodText}</p>
      <p>{epochText}</p>
    </div>
  );
};