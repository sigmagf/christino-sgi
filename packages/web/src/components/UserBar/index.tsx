import React from 'react';
import {
  RiSettings2Fill as SettingsIcon,
  RiSearchLine as SearchIcon,
} from 'react-icons/ri';

import { UserBarContainer } from './styles';

export const UserBar: React.FC = () => {
  return (
    <UserBarContainer>
      <div className="search">
        <div className="label">
          <label htmlFor="search">
            <SearchIcon size={20} />
          </label>
        </div>
        <input type="text" id="search" placeholder="Pesquisa..." />
      </div>
      <div className="settings">
        <button type="button"><SettingsIcon size={20} /></button>
      </div>
      <div className="user">
        <img src="https://www.codeapi.io/initials/Joao%20Gabriel" alt="" />
      </div>
    </UserBarContainer>
  );
};
