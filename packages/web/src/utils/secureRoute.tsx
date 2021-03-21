import React from 'react';
import { Navigate, RouteProps } from 'react-router';
import { Route } from 'react-router-dom';

import { UserPermissionsProvider } from '~/contexts/UserPermissions';
import { useLocalStorage } from '~/hooks';

export const SecureRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const storage = useLocalStorage();

  return storage.getItem('token') ? (
    <UserPermissionsProvider>
      <Route {...rest} element={element} />
    </UserPermissionsProvider>
  ) : (
    <>
      <Navigate to="/login" replace />
    </>
  );
};
