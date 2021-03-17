import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface IButtonStyledProps {
  variant?: 'primary'|'secondary'|'success'|'error'|'warning'|'info';
  uppercase?: boolean;
}

export const Button = styled.button<IButtonStyledProps>`
  min-height: 30px;
  min-width: 30px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 250ms ease;

  ${({ theme, variant }) => css`
    background: ${theme[variant || 'primary'].main};
    color: ${theme[variant || 'primary'].contrastText};
    svg { color: ${theme[variant || 'primary'].contrastText}; }
    box-shadow: ${theme.shadow};

    :hover {
      background: ${shade(0.2, theme[variant || 'primary'].main)};
    }

    :disabled {
      cursor: not-allowed;
      background: ${shade(0.25, theme[variant || 'primary'].main)};
    }
  `}
`;
