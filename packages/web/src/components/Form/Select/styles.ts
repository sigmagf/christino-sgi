import { lighten, shade, transparentize } from 'polished';
import styled from 'styled-components';

interface IInputContainerStyledProps {
  hasLabel: boolean;
}

export const SelectContainer = styled.div<IInputContainerStyledProps>`
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

    :hover {
      border: 2px solid ${({ theme }) => lighten(0.1, theme.primary.main)};
      box-shadow: ${({ theme }) => theme.shadow};
    }

    :focus-within {
      border-color: ${({ theme }) => theme.secondary.main};
      box-shadow: 0 0 4px 4px ${({ theme }) => transparentize(0.95, theme.secondary.main)};
    }

    &.react-select__control--is-disabled {
      background: ${({ theme }) => shade(0.1, theme.primary.main)};
    }

    .react-select__value-container {
      .react-select__single-value {
        color: ${({ theme }) => theme.primary.contrastText};
        font-family: 'Roboto Mono', monospace;
      }

      input {
        color: ${({ theme }) => theme.primary.contrastText} !important;
        font-family: 'Roboto Mono', monospace;

        ::placeholder {
          color: rgba(255, 255, 255, .75);
        }
      }
    }

    .react-select__value-container--is-multi {
      flex-wrap: nowrap;
      flex-direction: row;
    }
  }

  .react-select__menu {
    background: ${({ theme }) => lighten(0.1, theme.primary.main)};
    border-radius: 5px;
    overflow: hidden;
  }

  .react-select__menu-list {
    background: ${({ theme }) => lighten(0.1, theme.primary.main)};
    color: ${({ theme }) => theme.primary.contrastText};
    border-radius: 5px;
    max-height: 113px;

    .react-select__option {
      font-family: 'Roboto Mono', monospace;
    }

    .react-select__option--is-focused {
      background: ${({ theme }) => shade(0.05, theme.primary.main)};
      color: ${({ theme }) => theme.primary.contrastText};
    }

    .react-select__option--is-selected {
      background: ${({ theme }) => shade(0.05, theme.secondary.main)};
      color: ${({ theme }) => theme.secondary.contrastText};
    }
  }
`;
