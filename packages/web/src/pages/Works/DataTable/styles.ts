import styled, { css } from 'styled-components';

import { Card } from '~/components/Card';

export const DataTableCardContainer = styled(Card)`
  position: relative;
  
  th, td {
    font-family: 'Roboto Mono', monospace;
  }
`;interface IStatusBadgeStyledProps {
  status: number;
}

export const StatusBadge = styled.div<IStatusBadgeStyledProps>`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadow};

  ${({ theme, status }) => {
    switch(status) {
      default:
      case 0:
        return css`background: ${theme.warning.main};`; // EM ANALISE
      case 1:
        return css`background: ${theme.error.main};`; // REPROVADO
      case 2:
        return css`background: ${theme.info.main};`; // APROVADO
      case 3:
        return css`background: ${theme.success.main};`; // FINALIZADO
    }
  }}
`;
