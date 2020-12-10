import React from 'react';
import {
  FaCog as IconSettings,
  FaReceipt as IconReceipt,
  FaUser as IconClient,
  FaCar as IconVehicle,
  FaPencilRuler as IconWork,
} from 'react-icons/fa';

import { Button } from '../Button';
import { UserBarContainer } from './styles';

export const UserBar: React.FC = () => {
  return (
    <UserBarContainer>
      <div className="search">
        <Button apparence="secondary"><IconReceipt /></Button>
        <Button apparence="secondary"><IconClient /></Button>
        <Button apparence="secondary"><IconVehicle /></Button>
        <Button apparence="secondary"><IconWork /></Button>
      </div>
      <div className="settings">
        <button type="button"><IconSettings size={20} /></button>
      </div>
      <div className="user">
        <img src="https://www.codeapi.io/initials/Joao%20Gabriel" alt="" />
      </div>
    </UserBarContainer>
  );
};
