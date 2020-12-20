import React, { useState } from 'react';
import { 
  GeologicInstant,
  // GeologicValueRefTuple,
  ScrollCallbackSignatures,
  Strata,
} from '../util/types';
import { toPresentInstant } from '../util/geologicTimeline';

import { useDelineationScrollTrigger } from '../util/hooks';

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

interface CurrentTimeProps {
  strata: Strata;
};
export const CurrentTime: React.FC<CurrentTimeProps> = (props) => {

  const { strata } = props;

  const [ currentInstant ] = useState<GeologicInstant>(toPresentInstant());

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

  const strataWithCallbacks: Strata = toAddCallbacks(strata, enterCallbacks);

  useDelineationScrollTrigger(strataWithCallbacks);

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