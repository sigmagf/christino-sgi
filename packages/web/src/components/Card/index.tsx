import React from 'react';

import { CardContainer } from './styles';

type ICardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<ICardProps> = ({ children, ...props }) => (
  <CardContainer {...props}>
    { children }
  </CardContainer>
);
