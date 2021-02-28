import React, { useState, useEffect, useCallback } from 'react';
import { FaSignOutAlt, FaCog } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

import { Appnav } from '~/components/Appnav';
import { useLocalStorage } from '~/hooks';
import { Button } from '~/interface/Button';
import { IUser, IUserPermissions } from '~/interfaces';
import { api } from '~/utils/api';

import { AppContent, AppMain, UserBarContainer } from './styles';

interface ILayoutProps {
  setPermissions?: (perms: IUserPermissions) => void;
}

export const Layout: React.FC<ILayoutProps> = ({ children, setPermissions }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const navigate = useNavigate();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const [perms, setLocalPerms] = useState<IUserPermissions>();
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [validFinished, setValidFinished] = useState(false);
  /* END BOOLEAN STATES */

  const validate = useCallback(async () => {
    try {
      const response = await api.get<IUser>('/users/valid', { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      setLocalPerms(response.data);

      if(setPermissions) {
        setPermissions(response.data);
      }
    } catch(err) {
      storage.setItem('token', null);
      navigate('/login');
    }

    setValidFinished(true);
  }, [navigate, setPermissions, storage]);

  const onLogout = () => {
    navigate('/login');
    storage.setItem('token', null);
  };

  useEffect(() => {
    validate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(!validFinished) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ReactLoading type="bars" />
      </div>
    );
  }

  return (
    <>
      <Appnav perms={perms} />
      <AppMain>
        <UserBarContainer>
          <div className="user-name">
            Olá, <strong style={{ fontWeight: 'bold' }}>{ storage.getItem('userName') }</strong>
          </div>

          <div className="user-actions">
            <Button variant="error" onClick={onLogout}><FaSignOutAlt size={17} /></Button>
            <Button variant="secondary"><FaCog size={17} /></Button>
            <img src={`https://www.codeapi.io/initials/${storage.getItem('userName')?.replaceAll(' ', '%20')}`} alt="" />
          </div>
        </UserBarContainer>

        <AppContent>
          { children }
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50 }}>
            CHRISTINO - SISTEMA DE GESTAO INTERNO v0.0.24 (25/02/2020)
          </div>
        </AppContent>
      </AppMain>
    </>
  );
};
