import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: grid;

  margin-bottom: 10px;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  grid-template-areas: "CN CN CN CN CN CG CG VP VR VR VB VB"
                       "NI NI NI NI NI NI NI NI NI NI NI BT";

  input {
    text-transform: uppercase;
  }

  .buttons-container {
    grid-area: BT;
  }
`;
