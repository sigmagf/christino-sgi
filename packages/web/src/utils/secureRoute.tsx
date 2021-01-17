import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { Navigate, RouteProps } from 'react-router';
import { Route } from 'react-router-dom';

import { useLocalStorage } from '~/hooks';
import { isAuthenticated } from '~/services/isAuthenticated';

export const SecureRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const storage = useLocalStorage();
  const [isAuth, setIsAuth] = useState(-1);

  useEffect(() => {
    const revalid = async () => {
      const response = await isAuthenticated(storage);

      setIsAuth(!response ? 0 : 1);
    };

    revalid();
  }, [storage]);

  if(isAuth === -1) {
    return (

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      >
        <ReactLoading type="bars" />
      </div>
    );
  }

  if(isAuth === 0) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...rest} element={element} />;
};
