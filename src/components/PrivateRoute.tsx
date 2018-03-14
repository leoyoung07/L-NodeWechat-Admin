import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

let loggedIn = false;

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  if (!Component) {
    return null;
  }
  loggedIn = localStorage.getItem('loggedIn') === 'true';
  return (
    <Route
      {...rest}
      render={props => (
        loggedIn ?  <Component {...props}/> :
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )}
    />
  );
};

export default PrivateRoute;
