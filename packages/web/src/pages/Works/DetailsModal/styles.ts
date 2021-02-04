import { Form } from '@unform/web';
import styled from 'styled-components';

export const DetailsForm = styled(Form)`
  display: grid;
  gap: 15px;
  grid-template-columns: 75px 75px 75px 75px 75px 75px 75px 75px 75px 75px 75px 75px;

  grid-template-areas: 'CN CN CN CN CN CN CN CN CD CD CG CG'
                       'HR HR HR HR HR XX XX XX XX XX XX XX'
                       'VP VR VR VC VC XX XX XX XX XX XX XX'
                       'VM VM VM VM VM XX XX XX XX XX XX XX'
                       'VT VT VT VS VS XX XX XX XX XX XX XX'
                       'VD VD VD VD VD XX XX XX XX XX XX XX';

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
