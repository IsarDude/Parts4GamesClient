import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UseAuth } from "../context/auth";



function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = UseAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;