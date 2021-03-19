import React from 'react';
import { IconType } from 'react-icons';
import { FaHome, FaAngleLeft, FaAngleRight, FaUsers, FaCar, FaReceipt, FaUser } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoWithText from '~/assets/logo-texto.png';
import LogoWithoutText from '~/assets/logo.png';
import { usePersistedState } from '~/hooks';
import { IUserPermissions } from '~/interfaces';

import { AppnavContainer, AppnavContent, AppnavControllers, AppnavHeader, AppnavItem } from './styles';

interface IMenuItem {
  icon: IconType;
  label: string;
  disabled?: boolean;
  path: string;
}

interface IAppnavProps {
  perms?: IUserPermissions;
}

export const AppNav: React.FC<IAppnavProps> = ({ perms }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const { pathname } = useLocation();
  const navigate = useNavigate();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const { value: expanded, setValue: setExpanded } = usePersistedState('appBarExpanded', false);
  /* END BOOLEAN STATES */

  const menuItems: (IMenuItem|null)[] = [
    {
      icon: FaHome,
      label: 'Início',
      path: '/',
    }, {
      icon: FaCar,
      label: 'Veículos',
      path: '/vehicles',
    }, {
      icon: FaReceipt,
      label: 'Ordem de Serviço',
      path: '/works',
    }, {
      icon: FaUsers,
      label: 'Clientes',
      path: '/clients',
    },
    (perms && perms.userPermission > 1) ? {
      icon: FaUser,
      label: 'Usuários',
      path: '/users',
    } : null,
  ];

  return (
    <AppnavContainer className={expanded ? 'expanded' : 'collapsed'} expanded={expanded}>
      <AppnavControllers>
        {!expanded && <button type="button" onClick={() => setExpanded((old) => !old)} aria-label="Expand"><FaAngleRight size={20} /></button>}
        {expanded && <button type="button" onClick={() => setExpanded((old) => !old)} aria-label="Collapse"><FaAngleLeft size={20} /></button>}
      </AppnavControllers>
      <AppnavHeader>
        <img src={expanded ? LogoWithText : LogoWithoutText} alt="CHRISTINO-SGI" />
      </AppnavHeader>
      <AppnavContent>
        {menuItems.map((item) => item && (
          <AppnavItem key={item.label} selected={pathname === item.path} type="button" disabled={item.disabled || pathname === item.path} onClick={() => navigate(item.path)}>
            <div className="appnav-item-icon">
              <item.icon size={20} />
            </div>
            <div className="appnav-item-label">
              { item.label }
            </div>
          </AppnavItem>
        ))}
      </AppnavContent>
    </AppnavContainer>
  );
};
