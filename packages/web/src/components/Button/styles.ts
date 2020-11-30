import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface IButtonContainerStyledProps {
  apparence: 'default'|'primary'|'secondary'|'success'|'error'|'warning';
}

export const ButtonContainer = styled.button<IButtonContainerStyledProps>`
  min-height: 40px;
  min-width: 40px;
  padding: 0 5px;
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
          color: ${theme.primary.contrastText};
          :hover { background: ${shade(0.5, theme.primary.main)}; }
        `;
      case 'primary':
        return css`
          background: ${theme.primary.main};
          color: ${theme.primary.contrastText};
          :hover { background: ${shade(0.2, theme.primary.main)}; }
        `;
      case 'secondary':
        return css`
          background: ${theme.secondary.main};
          color: ${theme.secondary.contrastText};
          :hover { background: ${shade(0.2, theme.secondary.main)}; }
        `;
      case 'success':
        return css`
          background: ${theme.success.main};
          color: ${theme.success.contrastText};
          :hover { background: ${shade(0.2, theme.success.main)}; }
        `;
      case 'warning':
        return css`
          background: ${theme.warning.main};
          color: ${theme.warning.contrastText};
          :hover { background: ${shade(0.2, theme.warning.main)}; }
        `;
      case 'error':
        return css`
          background: ${theme.error.main};
          color: ${theme.error.contrastText};
          :hover { background: ${shade(0.2, theme.error.main)}; }
        `;
    }
  }}
`;
