import React, { Suspense } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { PageNames, RouteMap } from '../../util/types';
import peopleRoutes from '../people';
import { toPeopleRouteMap } from '../../util/routeMapping';

const peopleRouteMap: RouteMap = toPeopleRouteMap(peopleRoutes);

const People: React.FC = (props: any) => {
  const { match } = props;
  const links = peopleRoutes.map(({ name, route, description }) => {
    return (
      <div key={`link-${route}`}>
        <Link to={`${match.url}/${route}`}>
          <div className="text-white">{name}</div>
        </Link>
      </div>
    )
  })
  const routes = peopleRoutes.map(({ route }) => {
    return (
      <Route
        key={`route-${route}`}
        path={`${match.url}/${route}`}
        component={peopleRouteMap[route]}
      />
    );
  });
  return (
    <PageContainer pageName={PageNames.People}>
      <h1 className="text-3xl text-bone">People of the Dinogram</h1>
      <h1 className="text-2xl text-bone">Interviews and other Treats</h1>
      <div>
        {links}
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes}
          </Switch>
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default People;