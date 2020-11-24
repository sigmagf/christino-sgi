import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface IButtonContainerStyledProps {
  apparence: 'default'|'primary'|'secondary'|'success'|'error'|'warning';
}

export const ButtonContainer = styled.button<IButtonContainerStyledProps>`
  min-height: 30px;
  min-width: 50px;
  padding: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  color: ${({ theme }) => theme.primary.contrastText};
  cursor: pointer;
  transition: background-color 250ms ease;

  ${({ theme, apparence }) => {
    switch(apparence) {
      default:
      case 'default':
        return css`
          background: ${shade(0.2, theme.primary.main)};
          :hover { background: ${shade(0.5, theme.primary.main)}; }
        `;
      case 'primary':
        return css`
          background: ${theme.primary.main};
          :hover { background: ${shade(0.2, theme.primary.main)}; }
        `;
      case 'secondary':
        return css`
          background: ${theme.secondary.main};
          :hover { background: ${shade(0.2, theme.secondary.main)}; }
        `;
      case 'success':
        return css`
          background: ${theme.success.main};
          :hover { background: ${shade(0.2, theme.success.main)}; }
        `;
      case 'warning':
        return css`
          background: ${theme.warning.main};
          :hover { background: ${shade(0.2, theme.warning.main)}; }
        `;
      case 'error':
        return css`
          background: ${theme.error.main};
          :hover { background: ${shade(0.2, theme.error.main)}; }
        `;
    }
  }}

  :hover {
    background: ${({ theme }) => shade(0.5, theme.primary.main)};
  }
`;
