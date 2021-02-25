import { PageRoute } from '../../util/types';

export const routes: PageRoute[] = [
  {
    name: 'Person One',
    description: 'This is person one interview',
    route: 'person-one',
    componentPath: 'PersonOne',
  },
  {
    name: 'Person Two',
    description: 'This is person two interview',
    route: 'person-two',
    componentPath: 'PersonTwo',
  },
  {
    name: 'Person Three',
    description: 'This is person three interview',
    route: 'person-three',
    componentPath: 'PersonThree',
  },
];

export default routes;