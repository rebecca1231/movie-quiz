import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...args }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...args}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;