import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import {
  RiDashboardFill as IconDashboard,
  RiCarFill as IconCar,
  RiArrowLeftSLine as IconArrowLeft,
  RiArrowRightSLine as IconArrowRight,
  RiFileFill as IconFile,
  RiUserFill as Iconuser,
} from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

import { usePersistedState } from '~/hooks';

import {
  SidenavContainer,
  SidenavContent,
  SidenavControllers,
  SidenavHeader,
  SidenavItem,
} from './styles';

interface IMenuItem {
  icon: IconType;
  label: string;
  disabled?: boolean;
  path: string;
}

export const Sidenav: React.FC = () => {
  const [expanded, setExpanded] = usePersistedState('sidebarExpanded', false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const collapseSidenav = useCallback(() => {
    setExpanded(false);
  }, [setExpanded]);

  const expandSidenav = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);

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
      path: '/recibos',
    },
    {
      icon: Iconuser,
      label: 'Clientes',
      path: '/clientes',
    },
  ];

  return (
    <SidenavContainer className={expanded ? 'expanded' : 'collapsed'} expanded={expanded}>
      <SidenavControllers>
        {!expanded && <button type="button" onClick={expandSidenav}><IconArrowRight size={20} /></button>}
        {expanded && <button type="button" onClick={collapseSidenav}><IconArrowLeft size={20} /></button>}
      </SidenavControllers>
      <SidenavHeader>
        <img src={expanded ? 'assets/logo-texto.png' : 'assets/logo.png'} alt="CHRISTINO-SGI" />
      </SidenavHeader>
      <SidenavContent>
        {menuItems.map(({ icon: Icon, label, disabled = false, path }) => (
          <SidenavItem
            key={label}
            selected={pathname === path}
            type="button"
            disabled={disabled || pathname === path}
            onClick={() => navigate(path)}
          >
            <div className="sidenav-item-icon">
              <Icon size={20} />
            </div>
            <div className="sidenav-item-label">
              { label }
            </div>
          </SidenavItem>
        ))}
      </SidenavContent>
    </SidenavContainer>
  );
};
