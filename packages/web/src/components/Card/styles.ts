import styled from 'styled-components';

export const CardContainer = styled.div`
  width: auto;
  background: ${({ theme }) => theme.primary.main};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 5px;
  padding: 10px;
`;
