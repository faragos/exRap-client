import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// @ts-ignore
function PrivateRoute({ component, path }) {
  const isAuthenticated = true;
  if (isAuthenticated) {
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
}

export default PrivateRoute;
