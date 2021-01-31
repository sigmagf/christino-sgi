import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface IButtonContainerStyledProps {
  variant: 'primary'|'secondary'|'success'|'error'|'warning'|'info';
  uppercase?: boolean;
}

export const ButtonContainer = styled.button<IButtonContainerStyledProps>`
  min-height: 30px;
  min-width: 30px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 250ms ease;

  ${({ theme, variant }) => css`
    background: ${theme[variant].main};
    color: ${theme[variant].contrastText};

    :hover {
      background: ${shade(0.2, theme[variant].main)};
    }
    :disabled {
      cursor: not-allowed;
      background: ${shade(0.25, theme[variant].main)};
    }
  `}
`;
