export const arrayFirst = (xs: any[]): any => xs[0];
export const appendTo = (xs: any[]) => (x: any) => [ ...xs, x ];