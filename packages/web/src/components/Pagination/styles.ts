import { shade } from 'polished';
import styled from 'styled-components';

export const Paginator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 10px;
    width: 35px;
    height: 35px;
    background: ${({ theme }) => theme.secondary.main};
    color: ${({ theme }) => theme.secondary.contrastText};
    margin: 5px;
    border: none;

    :not(:disabled) {
      cursor: pointer;
    }

    :not(.current) {
      color: ${({ theme }) => theme.primary.contrastText};
      background: ${({ theme }) => shade(0.1, theme.primary.main)};
    }

    :disabled:not(.current) {
      background: ${({ theme }) => shade(0.2, theme.primary.main)};
    }
  }
`;
