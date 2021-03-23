import React from 'react';
import { FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { AppNav } from '~/components/AppNav';
import { Button } from '~/components/UI/Button';
import { useLocalStorage } from '~/hooks';

import { AppContent, AppMain, AppHeader } from './styles';

export const Layout: React.FC = ({ children }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const navigate = useNavigate();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  /* END BOOLEAN STATES */

  const onLogout = () => {
    navigate('/login');
    storage.setItem('token', null);
  };

  return (
    <>
      <AppNav />
      <AppMain>
        <AppHeader>
          <div className="user-name">
            Olá, <strong style={{ fontWeight: 'bold' }}>{ storage.getItem('userName') }</strong>
          </div>

          <div className="user-actions">
            <Button variant="error" onClick={onLogout}><FaSignOutAlt size={17} /></Button>
            <Button variant="secondary"><FaCog size={17} /></Button>
            <img src={`https://www.codeapi.io/initials/${storage.getItem('userName')?.replaceAll(' ', '%20')}`} alt="" />
          </div>
        </AppHeader>

        <AppContent>
          { children }

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50 }}>
            CHRISTINO - SISTEMA DE GESTAO INTERNO v0.0.27 (07/03/2021)
            <br />
            CRIADO POR <a href="https://github.com/sigmagf" target="_blank" style={{ color: '#fff'}}>JOÃO GABRIEL</a>
          </div>
        </AppContent>
      </AppMain>
    </>
  );
};
