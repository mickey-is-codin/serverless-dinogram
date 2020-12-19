/* GEOLOGY TYPES */
export interface GeologicInstant {
  readonly eon: string;
  readonly era: string;
  readonly period: string;
  readonly epoch: string;
};

export interface GeologicStratum {
  readonly name: string;
  readonly start: number;
  readonly duration: number;
};

export interface GeologicTimeline {
  readonly eons: GeologicStratum[];
  readonly eras: GeologicStratum[];
  readonly periods: GeologicStratum[];
  readonly epochs: GeologicStratum[];
};

export type GeologicValueRefTuple = [GeologicStratum[], React.MutableRefObject<(HTMLDivElement | null)[]>];

export interface ScrollCallbackSignatures {
  onEonEnter: (x: string) => () => void;
  onEraEnter: (x: string) => () => void;
  onPeriodEnter: (x: string) => () => void;
  onEpochEnter: (x: string) => () => void;
};