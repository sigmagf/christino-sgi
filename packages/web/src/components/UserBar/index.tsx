import React from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
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
      <div className="user-name">
        Olá, <strong>{ storage.getItem('userName') }</strong>
      </div>

      <div className="user-actions">
        <Button variant="error" onClick={onLogout}><FaSignOutAlt size={17} /></Button>
        <Button variant="secondary"><FaCog size={17} /></Button>
        <img src={`https://www.codeapi.io/initials/${storage.getItem('userName')?.replaceAll(' ', '%20')}`} alt="" />
      </div>
    </UserBarContainer>
  );
};
