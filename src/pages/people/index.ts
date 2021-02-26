import { PageRoute } from '../../util/types';

export const routes: PageRoute[] = [
  {
    name: 'Eric Lund',
    description: 'Talking about Dueling Dinosaurs with the head of the SECU lab',
    route: 'eric-lund-dueling-dinosaurs',
    componentPath: 'EricLund',
  },
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