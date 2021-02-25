import { PageRoute } from '../../util/types';

export const routes: PageRoute[] = [
  {
    name: 'Person One',
    description: 'This is person one interview',
    route: '',
    componentPath: 'Timeline',
  },
  {
    name: 'Person One',
    description: 'This is person one interview',
    route: 'about',
    componentPath: 'About',
  },
  {
    name: 'Person One',
    description: 'This is person one interview',
    route: 'people',
    componentPath: 'People',
  },
  {
    name: 'Person One',
    description: 'This is person one interview',
    route: 'contact',
    componentPath: 'Contact',
  },
];

export default routes;