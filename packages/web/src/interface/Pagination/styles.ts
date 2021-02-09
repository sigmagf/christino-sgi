import { shade } from 'polished';
import styled from 'styled-components';

export const Paginator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;

  .right-content,
  .page-results-count {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    gap: 15px;
  }

  .page-results-count {
    select {
      margin-left: 10px;
    }
  }
`;

export const PaginatorNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 5px;
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
