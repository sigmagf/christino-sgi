import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
`;

export const Details = styled.details`
  border-radius: 5px;
  overflow: hidden;

  summary {
    background-color: ${({ theme }) => theme.secondary.main};
    text-align: center;
    padding: 5px;
  }

  section {
    border: 1px solid ${({ theme }) => theme.secondary.main};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px;
  }
`;
