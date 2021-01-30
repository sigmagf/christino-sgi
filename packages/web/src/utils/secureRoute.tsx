import React from 'react';
import { Navigate, RouteProps } from 'react-router';
import { Route } from 'react-router-dom';

import { useLocalStorage } from '~/hooks';

export const SecureRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const storage = useLocalStorage();

  return storage.getItem('token') ? <Route {...rest} element={element} /> : <Navigate to="/login" replace />;
};
