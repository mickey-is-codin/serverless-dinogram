/* GEOLOGY TYPES */
export interface GeologicInstant {
  eon: string;
  era: string;
  period: string;
  epoch: string;
};

export interface GeologicStratum {
  name: string;
  start: number;
  duration: number;
};

export interface GeologicTimeline {
  eons: GeologicStratum[];
  eras: GeologicStratum[];
  periods: GeologicStratum[];
  epochs: GeologicStratum[];
};

export type GeologicValueRefTuple = [GeologicStratum[], React.MutableRefObject<(HTMLDivElement | null)[]>];

export interface ScrollCallbackSignatures {
  onEonEnter: (x: string) => () => void;
  onEraEnter: (x: string) => () => void;
  onPeriodEnter: (x: string) => () => void;
  onEpochEnter: (x: string) => () => void;
};