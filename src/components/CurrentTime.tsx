import React, { useState } from 'react';
import { 
  GeologicInstant,
  ScrollCallbackSignatures,
  GeologicTimeline,
} from '../util/types';
import { PRESENT_INSTANT } from '../util/constants';

import { useCurrentTimeMount } from '../hooks/useCurrentTimeMount';
import { useDelineationScrollTrigger } from '../hooks/useDelineationScrollTrigger';

interface CurrentTimeProps {
  timeline: GeologicTimeline;
};
export const CurrentTime: React.FC<CurrentTimeProps> = (props) => {

  useCurrentTimeMount();

  const { timeline } = props;

  const [ currentInstant ] = useState<GeologicInstant>(PRESENT_INSTANT);

  const [ eon, setEon ] = useState<string>(currentInstant.eon);
  const [ era, setEra ] = useState<string>(currentInstant.era);
  const [ period, setPeriod ] = useState<string>(currentInstant.period);
  const [ epoch, setEpoch ] = useState<string>(currentInstant.epoch);

  const enterCallbacks: ScrollCallbackSignatures = {
    eons: (newEon: string) => () => setEon(newEon),
    eras: (newEra: string) => () => setEra(newEra),
    periods: (newPeriod: string) => () => setPeriod(newPeriod),
    epochs: (newEpoch: string) => () => setEpoch(newEpoch),
  };

  useDelineationScrollTrigger(timeline, enterCallbacks);

  const eonText: string = `Eon: ${eon}`;
  const eraText: string = `Era: ${era}`;
  const periodText: string = `Period: ${period}`;
  const epochText: string = `Epoch: ${epoch}`;

  return (
    <div>
      <p>{eonText}</p>
      <p>{eraText}</p>
      <p>{periodText}</p>
      <p>{epochText}</p>
    </div>
  );
};