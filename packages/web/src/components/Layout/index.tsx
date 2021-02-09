import React, { useState, useEffect, useCallback } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

import { Appnav } from '~/components/Appnav';
import { UserBar } from '~/components/UserBar';

import { useLocalStorage } from '~/hooks';

import { IUser } from '~/interfaces';

import { api } from '~/utils/api';

import { AppContent, AppMain } from './styles';

interface ILayoutProps {
  setPermissions?: (perms: Omit<IUser, 'id'|'name'|'email'|'password'|'created_at'|'updated_at'>) => void;
}

export const Layout: React.FC<ILayoutProps> = ({ children, setPermissions }) => {
  const storage = useLocalStorage();
  const navigate = useNavigate();

  const [validFinished, setValidFinished] = useState(false);

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
    <>
      <Appnav />
      <AppMain>
        <UserBar />
        <AppContent>
          { children }
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50 }}>
            CHRISTINO SISTEMA DE GESTAO INTERNO v0.0.21 (06/02/2020)
          </div>
        </AppContent>
      </AppMain>
    </>
  );
};
