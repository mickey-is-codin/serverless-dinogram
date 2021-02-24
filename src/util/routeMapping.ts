import { lazy } from 'react';
import { LazyImport, RouteMap, PageRoute } from '../util/types';

const toLazyHomeRouteImport: (componentPath: string) => LazyImport = (
  componentPath
) => lazy(() => {
  return import(`../pages/root/${componentPath}`);
});

const toRouteMap = (toThing: any) => (homeRoutes: PageRoute[]): RouteMap => {
  return homeRoutes.reduce((acc, { route, componentPath }) => {
    return {
      ...acc,
      [route]: toThing(componentPath)
    };
  }, {});
};

export const toHomeRouteMap: (homeRoutes: PageRoute[]) => RouteMap = toRouteMap(toLazyHomeRouteImport);