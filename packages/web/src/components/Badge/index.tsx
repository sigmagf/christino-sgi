import React from 'react';

import { BadgeContainer } from './styles';

interface IBadgeProps {
  variant?: 'primary'|'secondary'|'success'|'warning'|'error'|'info';
}

export const Badge: React.FC<IBadgeProps> = ({ children, variant }) => (
  <BadgeContainer variant={variant || 'secondary'}>
    { children }
  </BadgeContainer>
);
