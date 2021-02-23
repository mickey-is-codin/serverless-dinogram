import { PageRoute } from '../../util/types';

export const routes: PageRoute[] = [
  {
    route: '',
    componentPath: 'Home',
  },
  {
    route: 'about',
    componentPath: 'About',
  },
  {
    route: 'people',
    componentPath: 'People',
  },
  {
    route: 'timeline',
    componentPath: 'Timeline',
  },
];

export default routes;