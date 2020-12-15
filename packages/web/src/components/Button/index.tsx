import React from 'react';

import { ButtonContainer } from './styles';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  apparence?: 'default'|'primary'|'secondary'|'success'|'error'|'warning';
};

export const Button: React.FC<Button> = ({ children, apparence, ...props }) => {
  return (
    <ButtonContainer {...props} apparence={apparence || 'default'}>
      { children }
    </ButtonContainer>
  );
};
