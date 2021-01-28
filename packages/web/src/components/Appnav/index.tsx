import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { FaHome, FaAngleLeft, FaAngleRight, FaUsers, FaCar, FaUserShield } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { usePersistedState } from '~/hooks';

import { AppnavContainer, AppnavContent, AppnavControllers, AppnavHeader, AppnavItem } from './styles';

interface IMenuItem {
  icon: IconType;
  label: string;
  disabled?: boolean;
  path: string;
}

export const Appnav: React.FC = () => {
  const { value: expanded, setValue: setExpanded } = usePersistedState('appBarExpanded', false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleAppnav = useCallback(() => {
    setExpanded((old) => !old);
  }, [setExpanded]);

  const menuItems: IMenuItem[] = [
    {
      icon: FaHome,
      label: 'Início',
      path: '/',
    },
    {
      icon: FaCar,
      label: 'Veículos',
      path: '/vehicles',
    },
    {
      icon: FaUserShield,
      label: 'Seguros',
      path: '/insurances',
    },
    {
      icon: FaUsers,
      label: 'Clientes',
      path: '/clients',
    },
  ];

  return (
    <AppnavContainer className={expanded ? 'expanded' : 'collapsed'} expanded={expanded}>
      <AppnavControllers>
        {!expanded && <button type="button" onClick={toggleAppnav} aria-label="Expand"><FaAngleRight size={20} /></button>}
        {expanded && <button type="button" onClick={toggleAppnav} aria-label="Collapse"><FaAngleLeft size={20} /></button>}
      </AppnavControllers>
      <AppnavHeader>
        <img src={expanded ? 'assets/logo-texto.png' : 'assets/logo.png'} alt="CHRISTINO-SGI" />
      </AppnavHeader>
      <AppnavContent>
        {menuItems.map(({ icon: Icon, label, disabled = false, path }) => (
          <AppnavItem
            key={label}
            selected={pathname === path}
            type="button"
            disabled={disabled || pathname === path}
            onClick={() => navigate(path)}
          >
            <div className="appnav-item-icon">
              <Icon size={20} />
            </div>
            <div className="appnav-item-label">
              { label }
            </div>
          </AppnavItem>
        ))}
      </AppnavContent>
    </AppnavContainer>
  );
};
