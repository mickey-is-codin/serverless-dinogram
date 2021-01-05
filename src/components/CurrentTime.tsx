import React, { useState } from 'react';
import { 
  GeologicInstant,
  ScrollCallbackSignatures,
  Strata,
} from '../util/types';
import { PRESENT_INSTANT } from '../util/constants';

import { 
  useCurrentTimeMount,
  useDelineationScrollTrigger,
} from '../util/hooks';

interface CurrentTimeProps {
  strata: Strata;
};
export const CurrentTime: React.FC<CurrentTimeProps> = (props) => {

  useCurrentTimeMount();

  const { strata } = props;

  const [ currentInstant ] = useState<GeologicInstant>(PRESENT_INSTANT);

  const [ eon, setEon ] = useState<string>(currentInstant.eon);
  const [ era, setEra ] = useState<string>(currentInstant.era);
  const [ period, setPeriod ] = useState<string>(currentInstant.period);
  const [ epoch, setEpoch ] = useState<string>(currentInstant.epoch);

  const enterCallbacks: ScrollCallbackSignatures = {
    onEonEnter: (newEon: string) => () => setEon(newEon),
    onEraEnter: (newEra: string) => () => setEra(newEra),
    onPeriodEnter: (newPeriod: string) => () => setPeriod(newPeriod),
    onEpochEnter: (newEpoch: string) => () => setEpoch(newEpoch),
  };

  useDelineationScrollTrigger(strata, enterCallbacks);

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