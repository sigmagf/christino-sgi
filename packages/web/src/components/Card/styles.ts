import styled from 'styled-components';

export const CardContainer = styled.div`
  width: auto;
  background: ${({ theme }) => theme.primary.main};
  box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
  border-radius: 5px;
  padding: 10px;
`;
