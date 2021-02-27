import React from 'react';
import { IconType } from 'react-icons';
import { FaHome, FaAngleLeft, FaAngleRight, FaUsers, FaCar, FaReceipt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoWithText from '~/assets/logo-texto.png';
import LogoWithoutText from '~/assets/logo.png';
import { usePersistedState } from '~/hooks';

import { AppnavContainer, AppnavContent, AppnavControllers, AppnavHeader, AppnavItem } from './styles';

interface IMenuItem {
  icon: IconType;
  label: string;
  disabled?: boolean;
  path: string;
}

export const Appnav: React.FC = () => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const { pathname } = useLocation();
  const navigate = useNavigate();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const { value: expanded, setValue: setExpanded } = usePersistedState('appBarExpanded', false);
  /* END BOOLEAN STATES */

  const menuItems: IMenuItem[] = [
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
        {menuItems.map(({ icon: Icon, label, disabled = false, path }) => (
          <AppnavItem key={label} selected={pathname === path} type="button" disabled={disabled || pathname === path} onClick={() => navigate(path)}>
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
