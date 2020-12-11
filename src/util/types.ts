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