export const arrayFirst = (xs: any[]): any => xs[0];
export const toAppendTo = (xs: any[]) => (x: any) => [ ...xs, x ];