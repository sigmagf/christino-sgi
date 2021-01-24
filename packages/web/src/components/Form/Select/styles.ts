import { lighten, transparentize } from 'polished';
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

  .react-select__control {
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.shadow};
    background: ${({ theme }) => lighten(0.1, theme.primary.main)};
    border: 2px solid ${({ theme }) => lighten(0.1, theme.primary.main)};

    :hover,
    :focus {
      border-color: ${({ theme }) => theme.secondary.main};
      box-shadow: 0 0 4px 4px ${({ theme }) => transparentize(0.95, theme.secondary.main)};
    }

    .react-select__value-container {
      .react-select__single-value {
        color: ${({ theme }) => theme.primary.contrastText};
        font-family: monospace;
      }

      input {
        color: ${({ theme }) => theme.primary.contrastText} !important;
        font-family: monospace;

        ::placeholder {
          color: rgba(255, 255, 255, .75);
        }
      }
    }
  }

  .react-select__menu,
  .react-select__menu-list {
    background: ${({ theme }) => lighten(0.1, theme.primary.main)};
    color: ${({ theme }) => theme.primary.contrastText};
    border-radius: 5px;
    overflow: hidden;

    .react-select__option {
      font-family: monospace;
    }

    .react-select__option--is-focused,
    .react-select__option--is-selected {
      background: ${({ theme }) => theme.secondary.main};
      color: ${({ theme }) => theme.secondary.contrastText};
    }
  }
`;
