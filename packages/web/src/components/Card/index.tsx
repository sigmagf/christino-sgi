import React from 'react';

import { CardContainer } from './styles';

export const Card: React.FC = ({ children }) => {
  return (
    <CardContainer>
      { children }
    </CardContainer>
  );
};
