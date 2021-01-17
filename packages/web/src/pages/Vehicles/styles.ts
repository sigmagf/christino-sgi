import styled, { css } from 'styled-components';

interface IStatusBadgeStyledProps {
  status: number;
}

export const CRVContainer = styled.div`

`;

export const StatusBadge = styled.div<IStatusBadgeStyledProps>`
  width: 15px;
  height: 15px;
  border-radius: 20px;
  box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);

  ${({theme, status}) => {
    switch (status) {
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