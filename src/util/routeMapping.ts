import { lazy } from 'react';
import { LazyImport, RouteMap, PageRoute } from '../util/types';

const toLazyHomeRouteImport: (componentPath: string) => LazyImport = (
  componentPath
) => lazy(() => {
  return import(`../pages/root/${componentPath}`);
});

const toLazyPeopleRouteImport: (componentPath: string) => LazyImport = (
  componentPath
) => lazy(() => {
  return import(`../pages/people/${componentPath}`);
});

const toRouteMap = (
  toLazyRouteImport: (componentPath: string) => LazyImport
) => (
  homeRoutes: PageRoute[]
): RouteMap => {
  return homeRoutes.reduce((acc, { route, componentPath }) => {
    return {
      ...acc,
      [route]: toLazyRouteImport(componentPath)
    };
  }, {});
};

export const toHomeRouteMap: (homeRoutes: PageRoute[]) => RouteMap = toRouteMap(toLazyHomeRouteImport);
export const toPeopleRouteMap: (peopleRoutes: PageRoute[]) => RouteMap = toRouteMap(toLazyPeopleRouteImport);
