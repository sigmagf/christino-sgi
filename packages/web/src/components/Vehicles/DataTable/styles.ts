import styled, { css } from 'styled-components';

import { Card } from '~/components/UI/Card';

interface IStatusBadgeStyledProps {
  status: number;
}

export const VehiclesStatusBadge = styled.div<IStatusBadgeStyledProps>`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadow};

  ${({ theme, status }) => {
    switch(status) {
      default:
      case 1:
        return css`background: ${theme.error.main};`;
      case 2:
        return css`background: ${theme.success.main};`;
      case 3:
        return css`background: ${theme.warning.main};`;
      case 4:
        return css`background: ${theme.info.main};`;
    }
  }}
`;

export const DataTableCardContainer = styled(Card)`
  position: relative;
  
  th, td {
    font-family: 'Roboto Mono', monospace;
  }
`;
