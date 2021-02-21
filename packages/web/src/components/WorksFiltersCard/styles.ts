import { Form } from '@unform/web';
import styled from 'styled-components';

import { Card } from '~/interface/Card';

export const FiltersCard = styled(Card)`
  margin-bottom: 15px;
`;

export const FiltersCardForm = styled(Form)`
  display: grid;
  grid-gap: 10px;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'CN CN CN CN CN CN CG CG CG ST ST ST'
                       'ID ID ID VL VL SV SV SV SV SC SC SC';

  > :nth-child(1) { grid-area: CN }; /* CLIENT */
  > :nth-child(2) { grid-area: CG }; /* GROUP */
  > :nth-child(3) { grid-area: ST }; /* STATUS */
  > :nth-child(4) { grid-area: ID }; /* IDENTIFIER */
  > :nth-child(5) { grid-area: VL }; /* VALUE */
  > :nth-child(6) { grid-area: SV }; /* SERVICE */
  > :nth-child(7) { grid-area: SC }; /* SECTOR */
  > :nth-child(8) { grid-area: VF };
  > :nth-child(9) { grid-area: VT };
`;

export const FiltersCardActionButtons = styled.div`
  margin-top: 15px;

  grid-area: AC;
  display: flex;
  gap: 10px;

  justify-content: flex-end;
`;
