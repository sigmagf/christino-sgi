import React from 'react';

import { TableContainer } from './styles';

type ITable = React.TableHTMLAttributes<HTMLTableElement>;

export const Table: React.FC<ITable> = ({ children, ...props }) => {
  return (
    <TableContainer {...props}>
      { children }
    </TableContainer>
  );
};
