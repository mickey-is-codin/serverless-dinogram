import { BASE_CLASS_DEFAULT, DNE } from "./constants";
import { Campaign, PageNames, RawStratum, Stratum } from "./types";

export const invert = (x: boolean): boolean => !x;
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

interface ActiveClassConfig {
  pageName: PageNames,
  activeClass: string,
  inactiveClass: string,
  baseClass?: string,
};
export const toNavClass = (
  config: ActiveClassConfig
) => (
  elementName: PageNames
): string => {
  const { pageName, activeClass, inactiveClass, baseClass = BASE_CLASS_DEFAULT } = config;
  const active = pageName === elementName;
  const activeClassName = active ? activeClass : inactiveClass;
  return `${baseClass} ${activeClassName}`;
};
export const toNameExceptDNE = (stratum: Stratum): string => {
  const name: string = pluck('name')(stratum);
  if (name === DNE) return "";
  const time: number = pluck('start')(stratum) / 100;
  return `${name} (${time}Mya)`;
};
export const toCampaignMenuName = (campaign: Campaign) => {
  const name: string = pluck('title')(campaign);
  const time: number = pluck('end')(campaign) / 100;
  return `${name} (${time}Mya)`;
};