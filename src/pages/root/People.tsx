import React, { lazy, Suspense } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { PageNames } from '../../util/types';

const PersonOne = lazy(() => import('../people/PersonOne'));
const PersonTwo = lazy(() => import('../people/PersonTwo'));
const PersonThree = lazy(() => import('../people/PersonThree'));

const People: React.FC = (props: any) => {
  const { match } = props;
  console.log('match: ', match);
  return (
    <PageContainer pageName={PageNames.People}>
      <h1 className="text-3xl text-bone">People</h1>
      <h1 className="text-2xl text-bone">Coming soon...</h1>
      <div>
        <Link to={`${match.url}/person-one`}><div>One</div></Link>
        <Link to={`${match.url}/person-two`}><div>Two</div></Link>
        <Link to={`${match.url}/person-three`}><div>Three</div></Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={`${match.url}/person-one`} component={PersonOne} />
            <Route path={`${match.url}/person-two`} component={PersonTwo} />
            <Route path={`${match.url}/person-three`} component={PersonThree} />
          </Switch>
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default People;