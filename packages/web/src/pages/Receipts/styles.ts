import styled from 'styled-components';

export const ReceiptsFilters = styled.div`
  display: grid;

  margin-bottom: 10px;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  grid-template-areas: 'CL CL CL CL CL CL CD CD GP GP'
                       'PL RN RN MM MM MM CT CT CT SB';

  input {
    text-transform: uppercase;
  }

  > button {
    margin-top: 20px;
    max-height: 40px;
  }
`;
