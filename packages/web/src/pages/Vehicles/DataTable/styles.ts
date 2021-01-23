import styled, { css } from 'styled-components';

interface IStatusBadgeStyledProps {
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
        return css`background: ${theme.error.main};`;
      case 1:
        return css`background: ${theme.success.main};`;
      case 2:
        return css`background: ${theme.warning.main};`;
      case 3:
        return css`background: ${theme.info.main};`;
    }
  }}
`;
