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
    font-weight: bold;

    transition: background-color 250ms ease;
  }

  .react-datepicker-wrapper {
    width: 100%;

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
  }

  // PICKER
  .react-datepicker {
    background: ${({ theme }) => theme.primary.main};
    border: 1px solid ${({ theme }) => theme.secondary.main};
    box-shadow: ${({ theme }) => theme.shadow};

    .react-datepicker__triangle {
      border-bottom-color: ${({ theme }) => theme.secondary.main};

      ::before { border-bottom-color: ${({ theme }) => theme.secondary.main}; }
    }

    .react-datepicker__navigation--previous { border-right-color: ${({ theme }) => theme.primary.main}; }
    .react-datepicker__navigation--next { border-left-color: ${({ theme }) => theme.primary.main}; }

    .react-datepicker__header {
      background: ${({ theme }) => theme.secondary.main};
      border-bottom: none;

      .react-datepicker__current-month {
        color: ${({ theme }) => theme.primary.main};
        font-family: 'Roboto Mono', monospace;
        text-transform: uppercase;
      }

      .react-datepicker__day-names {
        .react-datepicker__day-name {
          color: ${({ theme }) => theme.primary.main};
          font-family: 'Roboto Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
        }
      }
    }

    .react-datepicker__month {
      .react-datepicker__week {
        .react-datepicker__day {
          color: ${({ theme }) => theme.primary.contrastText};

          :hover {
            background: ${({ theme }) => theme.secondary.main};
          }
        }

        .react-datepicker__day--today,
        .react-datepicker__day--selected {
          background: ${({ theme }) => theme.info.main};
          font-weight: bold;
        }
      }
    }
  }

`;
