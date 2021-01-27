import { lighten, shade, transparentize } from 'polished';
import styled from 'styled-components';

interface IInputContainerStyledProps {
  hasLabel: boolean;
}

export const InputContainer = styled.div<IInputContainerStyledProps>`
  position: relative;
  width: 100%;

  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 20px;
    width: 100%;

    padding: 0 5px;

    font-size: 10px;
    font-weight: 800;

    transition: background-color 250ms ease;
  }

  input {
    height: calc(60px - 20px);
    width: 100%;

    padding: 5px;

    color: ${({ theme }) => theme.primary.contrastText};
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.shadow};
    background: ${({ theme }) => lighten(0.1, theme.primary.main)};
    border: 2px solid ${({ theme }) => lighten(0.1, theme.primary.main)};

    :disabled {
      background: ${({ theme }) => shade(0.1, theme.primary.main)};
    }

    :focus {
      border-color: ${({ theme }) => theme.secondary.main};
      box-shadow: 0 0 4px 4px ${({ theme }) => transparentize(0.95, theme.secondary.main)};
    }

    ::placeholder {
      color: rgba(255, 255, 255, .75);
    }
  }

  .error-container {
    background: ${({ theme }) => theme.error.main};
  }
`;
