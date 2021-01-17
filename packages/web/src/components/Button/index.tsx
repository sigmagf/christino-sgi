import React from 'react';

import { ButtonContainer } from './styles';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'|'secondary'|'success'|'error'|'warning'|'info';
};

export const Button: React.FC<Button> = ({ children, variant, ...props }) => (
  <ButtonContainer {...props} variant={variant || 'primary'}>
    { children }
  </ButtonContainer>
);
