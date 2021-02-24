import { PageRoute } from '../../util/types';

export const routes: PageRoute[] = [
  {
    route: '',
    componentPath: 'Timeline',
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
    route: 'contact',
    componentPath: 'Contact',
  },
];

export default routes;