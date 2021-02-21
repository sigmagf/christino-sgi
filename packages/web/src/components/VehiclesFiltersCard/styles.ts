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
  grid-template-areas: 'CN CN CN CN CN CN CG CG CG VS VS VS'
                       'VP VR VR VC VC VM VM VM VF VF VT VT';

  > :nth-child(1) { grid-area: CN };
  > :nth-child(2) { grid-area: CG };
  > :nth-child(3) { grid-area: VS };
  > :nth-child(4) { grid-area: VP };
  > :nth-child(5) { grid-area: VR };
  > :nth-child(6) { grid-area: VC };
  > :nth-child(7) { grid-area: VM };
  > :nth-child(8) { grid-area: VF };
  > :nth-child(9) { grid-area: VT };
`;

export const FiltersCardActionButtons = styled.div`
  &:not(:empty) {
    margin-top: 15px;
  }

  grid-area: AC;
  display: flex;
  gap: 10px;

  justify-content: flex-end;
`;
