import React, { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { AuthInfo } from '../store/authInfo/types';

interface PrivateRouteProps {
  component: ComponentType;
  path: string
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({ component, path }) => {
  const currentUser: AuthInfo = useAppSelector((state) => state.authInfo);

  if ((currentUser.isAuthenticated && currentUser?.roles?.includes('Admin')) || (currentUser.isAuthenticated && path !== '/administration')) {
    // if the user is authenticated, just render the component
    return (
      <Route
        path={path}
        render={(props: any) => React.createElement(component, { ...props })}
      />
    );
  }
  // otherwise redirect to the login page
  return (
    <Route
      path={path}
      render={() => (
        <Redirect
          to={{ pathname: '/login' }}
        />
      )}
    />
  );
};

export default PrivateRoute;
