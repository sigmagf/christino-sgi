import React, { useState, useEffect, useCallback, createContext } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

import { Appnav } from '~/components/Appnav';
import { UserBar } from '~/components/UserBar';
import { useLocalStorage } from '~/hooks';
import { IUser } from '~/interfaces';
import { api } from '~/utils/api';

import { AppContent, AppMain } from './styles';

export const UserPermissionsContext = createContext<Omit<IUser, 'id'|'name'|'email'|'password'|'createdAt'|'updatedAt'>>({
  cliePermission: 0,
  despPermission: 0,
  seguPermission: 0,
  userPermission: 0,
  workPermission: 0,
});

export const Layout: React.FC = ({ children }) => {
  const storage = useLocalStorage();
  const navigate = useNavigate();

  const [validFinished, setValidFinished] = useState(false);
  const [permissions, setPermissions] = useState<Omit<IUser, 'id'|'name'|'email'|'password'|'createdAt'|'updatedAt'>>({
    cliePermission: -1,
    despPermission: -1,
    seguPermission: -1,
    userPermission: -1,
    workPermission: -1,
  });

  const validate = useCallback(async () => {
    try {
      const response = await api.get<IUser>('/users/valid', { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      if(setPermissions) {
        setPermissions(response.data);
      }
    } catch(err) {
      storage.setItem('token', null);
      navigate('/login');
    }

    setValidFinished(true);
  }, [navigate, setPermissions, storage]);

  useEffect(() => {
    validate();
  }, []); // eslint-disable-line

  if(!validFinished) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ReactLoading type="bars" />
      </div>
    );
  }

  return (
    <UserPermissionsContext.Provider value={permissions}>
      <Appnav />
      <AppMain>
        <UserBar />
        <AppContent>
          { children }
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50 }}>
            CHRISTINO SISTEMA DE GESTAO INTERNO v0.0.22 (16/02/2020)
          </div>
        </AppContent>
      </AppMain>
    </UserPermissionsContext.Provider>
  );
};
