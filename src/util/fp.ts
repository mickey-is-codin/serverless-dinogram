export const arrayFirst = (xs: any[]): any => xs[0];
export const toAppendTo = (xs: any[]) => (x: any) => [ ...xs, x ];
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