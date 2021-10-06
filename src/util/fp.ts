import { RawStratum, Stratum } from "./types";

export const arrayFirst = (xs: any[]): any => xs[0];
export const toAppendTo = (xs: any[]) => (x: any) => [ ...xs, x ];
export const identity = (x: any): any => x;
export const noop = () => {};
export const toNoop = () => noop;
export const isLast = (xs: any[]) => (ix: any) => ix === xs.length - 1;
export const withCommas = (
  x: number
): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const toScrollPositionAsYear = (
  x: number
): string => 
  withCommas(Math.floor(x / window.innerHeight * 100 * 10000));
export const pluck = (...keys: string[]) => {
  return keys.reduce(
    (accFn, key) => (o) => (accFn(o) || {})[key], 
    identity
  );
};
export const unique = (xs: any[]) => {
  return xs.reduce((acc, curr) => {
    return acc.includes(curr) ? acc : [...acc, curr];
  }, []);
};
export const withRefs = (strata: RawStratum[]): Stratum[] => {
  return strata.map((stratum: RawStratum) => {
    return {
      ...stratum,
      ref: { current: null },
    }
  });
};
export const toDetermineActiveClass = (
  pageName: string
) => (
  elementName: string
): string => {
  console.log('pageName: ', pageName);
  console.log('elementName: ', elementName);
  const active = pageName === elementName;
  return `hover:text-bone ${active && 'text-bone'}`;
};