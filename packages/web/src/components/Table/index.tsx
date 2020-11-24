import React from 'react';

import { TableContainer } from './styles';

export const Table: React.FC = ({ children }) => {
  return (
    <TableContainer>
      { children }
    </TableContainer>
  );
};
