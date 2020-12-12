import React, { useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import {
  FaHome as IconDashboard,
  FaCar as IconCar,
  FaAngleLeft as IconArrowLeft,
  FaAngleRight as IconArrowRight,
  FaFile as IconFile,
  FaUsers as Iconuser,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppnavContainer, AppnavContent, AppnavControllers, AppnavHeader, AppnavItem } from './styles';

export interface IMenuItem {
  icon: IconType;
  label: string;
  disabled?: boolean;
  path: string;
}

export const Appnav: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleAppnav = useCallback(() => {
    setExpanded((old) => !old);
  }, []);

  const menuItems: IMenuItem[] = [
    {
      icon: IconDashboard,
      label: 'Início',
      path: '/',
    },
    {
      icon: IconCar,
      label: 'Licenciamentos',
      disabled: true,
      path: '/licenciamentos',
    },
    {
      icon: IconFile,
      label: 'Recibos',
      path: '/crvs',
    },
    {
      icon: Iconuser,
      label: 'Clientes',
      path: '/clientes',
    },
  ];

  return (
    <AppnavContainer className={expanded ? 'expanded' : 'collapsed'} expanded={expanded}>
      <AppnavControllers>
        {!expanded && <button type="button" onClick={toggleAppnav}><IconArrowRight size={20} /></button>}
        {expanded && <button type="button" onClick={toggleAppnav}><IconArrowLeft size={20} /></button>}
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
