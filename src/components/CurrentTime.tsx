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
export const CurrentTime: React.FC<CurrentTimeProps> = (props) => {

  const [ currentInstant ] = useState<GeologicInstant>(toPresentInstant());

  const [ eon, setEon ] = useState<string>(currentInstant.eon);
  const [ era, setEra ] = useState<string>(currentInstant.era);
  const [ period, setPeriod ] = useState<string>(currentInstant.period);
  const [ epoch, setEpoch ] = useState<string>(currentInstant.epoch);

  // const [ scrollInstant, setScrollInstant ] = useState<GeologicInstant>(currentInstant);
  // const setEon = (eon: string) => setScrollInstant({ ...scrollInstant, eon });
  // const setEra = (era: string) => setScrollInstant({ ...scrollInstant, era });
  // const setPeriod = (period: string) => setScrollInstant({ ...scrollInstant, period });
  // const setEpoch = (epoch: string) => setScrollInstant({ ...scrollInstant, epoch });

  const enterCallbacks: ScrollCallbackSignatures = {
    onEonEnter: (newEon: string) => () => setEon(newEon),
    onEraEnter: (newEra: string) => () => setEra(newEra),
    onPeriodEnter: (newPeriod: string) => () => setPeriod(newPeriod),
    onEpochEnter: (newEpoch: string) => () => setEpoch(newEpoch),
  };
  // const enterCallbacks: ScrollCallbackSignatures = {
  //   onEonEnter: (newEon: string) => () => setScrollInstant((scrollInstant) => ({ ...scrollInstant, eon: newEon })),
  //   onEraEnter: (newEra: string) => () => setScrollInstant((scrollInstant) => ({ ...scrollInstant, era: newEra })),
  //   onPeriodEnter: (newPeriod: string) => () => setScrollInstant((scrollInstant) => ({ ...scrollInstant, period: newPeriod })),
  //   onEpochEnter: (newEpoch: string) => () => setScrollInstant((scrollInstant) => ({ ...scrollInstant, epoch: newEpoch })),
  // };

  useDelineationScrollTrigger({ ...props, enterCallbacks });

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