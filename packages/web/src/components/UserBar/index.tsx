import React from 'react';
import {
  FaCog as IconSettings,
  FaSignOutAlt as IconLogout,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '~/hooks';

import { Button } from '../Button';
import { UserBarContainer } from './styles';

export const UserBar: React.FC = () => {
  const storage = useLocalStorage();
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/login');
    storage.setItem('token', null);
  };

  return (
    <UserBarContainer>
      <div className="actions">
        <strong>Olá,</strong> { storage.getItem('userName') }
      </div>

      <div className="user-actions">
        <Button apparence="error" onClick={onLogout}><IconLogout size={17} /></Button>
        <Button apparence="secondary"><IconSettings size={17} /></Button>
        <img src="https://www.codeapi.io/initials/Joao%20Gabriel" alt="" />
      </div>
    </UserBarContainer>
  );
};
