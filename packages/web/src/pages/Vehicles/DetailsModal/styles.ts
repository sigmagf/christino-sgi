import { Form } from '@unform/web';
import { transparentize } from 'polished';
import styled from 'styled-components';

export const DetailsModalForm = styled(Form)`
  display: grid;
  gap: 15px;
  grid-template-columns: 75px 85px 40px 70px 70px;

  grid-template-areas: 'CN CN CN CN CN'
                       'CD CD CG CG CG'
                       'HR HR HR HR HR'
                       'VP VR VR VC VC'
                       'VM VM VM VM VM'
                       'VT VT VT VS VS'
                       'VD VD VD VD VD';

  input {
    text-transform: uppercase;
  }

  > :nth-child(1) { grid-area: CN; } /* NAME */
  > :nth-child(2) { grid-area: CD; } /* DOCUMENT */
  > :nth-child(3) { grid-area: CG; } /* GROUP */

  > :nth-child(4) { grid-area: HR; } /* HR */

  > :nth-child(5) { grid-area: VP; } /* PLATE */
  > :nth-child(6) { grid-area: VR; } /* RENAVAM */
  > :nth-child(7) { grid-area: VC; } /* CRV */
  > :nth-child(8) { grid-area: VM; } /* BRAND/MODEL */
  > :nth-child(9) { grid-area: VT; } /* TYPE */
  > :nth-child(10) { grid-area: VS; } /* STATUS */
  > :nth-child(11) { grid-area: VD; } /* DETAILS */
`;

export const DetailsModalActionButtons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

export const DetailsModalLoadingContainer = styled.div`
  z-index: 999;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: ${({ theme }) => transparentize(0.95, theme.background)};

  display: flex;
  justify-content: center;
  align-items: center;
`;
