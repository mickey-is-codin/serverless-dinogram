import React, { useState } from 'react';
import { 
  GeologicInstant,
  GeologicValueRefTuple,
  ScrollCallbackSignatures,
} from '../util/types';
import { toPresentInstant } from '../util/geologicTimeline';

import { useDelineationScrollTrigger } from '../util/hooks';

interface CurrentTimeProps {
  eons: GeologicValueRefTuple;
  eras: GeologicValueRefTuple;
  periods: GeologicValueRefTuple;
  epochs: GeologicValueRefTuple;
};
export const CurrentTime = (props: CurrentTimeProps): JSX.Element => {

  const { eons, eras, periods, epochs } = props;

  const [ currentInstant ] = useState<GeologicInstant>(toPresentInstant());

  const [ eon, setEon ] = useState<string>(currentInstant.eon);
  const [ era, setEra ] = useState<string>(currentInstant.era);
  const [ period, setPeriod ] = useState<string>(currentInstant.period);
  const [ epoch, setEpoch ] = useState<string>(currentInstant.epoch);

  const scrollCallbacks: ScrollCallbackSignatures = {
    onEonEnter: (newEon: string) => () => setEon(newEon),
    onEraEnter: (newEra: string) => () => setEra(newEra),
    onPeriodEnter: (newPeriod: string) => () => setPeriod(newPeriod),
    onEpochEnter: (newEpoch: string) => () => setEpoch(newEpoch),
  };

  useDelineationScrollTrigger(
    eons,
    eras,
    periods,
    epochs,
    scrollCallbacks
  );

  const eonText: string = `Eon: ${eon}`;
  const eraText: string = `Era: ${era}`;
  const periodText: string = `Period: ${period}`;
  const epochText: string = `Epoch: ${epoch}`;

  return (
    <div className="fixed text-left text-xl pt-10 px-10 left-10 text-bone z-90">
      <p>{eonText}</p>
      <p>{eraText}</p>
      <p>{periodText}</p>
      <p>{epochText}</p>
    </div>
  );
};