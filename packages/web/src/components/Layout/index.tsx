import React, { useState, useEffect, useCallback } from 'react';
import ReactLoading from 'react-loading';

import { useLocalStorage } from '~/hooks';
import { IUser } from '~/interfaces';
import { api } from '~/utils/api';

import { Appnav } from '../Appnav';
import { UserBar } from '../UserBar';
import { AppContent, AppMain } from './styles';

interface ILayoutProps {
  setPermissions?: (perms: Omit<IUser, 'id'|'name'|'email'|'password'|'created_at'|'updated_at'>) => void;
}

export const Layout: React.FC<ILayoutProps> = ({ children, setPermissions }) => {
  const storage = useLocalStorage();

  const [isAuth, setIsAuth] = useState(-1);

  const validate = useCallback(async () => {
    const response = await api.get<IUser>('/users/valid', {
      headers: { authorization: `Bearer ${storage.getItem('token')}` },
    });

    if(response.status >= 200 && response.status < 400) {
      setIsAuth(1);

      if(setPermissions) {
        setPermissions(response.data);
      }
    } else {
      setIsAuth(0);
    }
  }, [setPermissions, storage]);

  useEffect(() => {
    validate();
  }, []); // eslint-disable-line

  if(isAuth === -1) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ReactLoading type="bars" />
      </div>
    );
  }

  return (
    <>
      <Appnav />
      <AppMain>
        <UserBar />
        <AppContent>
          { children }
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 75 }}>
            CHRISTINO SISTEMA DE GESTAO INTERNO v0.0.11r1
          </div>
        </AppContent>
      </AppMain>
    </>
  );
};
