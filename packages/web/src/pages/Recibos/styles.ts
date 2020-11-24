import styled from 'styled-components';

export const RecibosFilters = styled.div`
  display: grid;

  margin-bottom: 10px;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  grid-template-areas: "CL CL CL CL CL CL CD CD GP GP"
                       "PL RN RN RN MM MM MM CT CT CT"
                       "IN IN IN IN SB SB NI NI NI NI";

  div {
    :nth-child(1) {
      grid-area: CL;
    }

    :nth-child(2) {
      grid-area: CD;
    }

    :nth-child(3) {
      grid-area: GP;
    }

    :nth-child(4) {
      grid-area: PL;
    }

    :nth-child(5) {
      grid-area: RN;
    }

    :nth-child(6) {
      grid-area: MM;
    }

    :nth-child(7) {
      grid-area: CT;
    }
  }

  > button {
    grid-area: SB;
  }
`;
