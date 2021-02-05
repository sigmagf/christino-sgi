import { Form } from '@unform/web';
import styled from 'styled-components';

export const DetailsForm = styled(Form)`
  display: grid;
  gap: 15px;
  grid-template-columns: 75px 75px 75px 75px 75px 75px 75px 75px 75px 75px 75px 75px;

  grid-template-areas: 'CN CN CN CN CN CN CN CN CD CD CG CG'
                       'HR HR HR HR HR HR HR HR HR HR HR HR'
                       'SC SC SV SV SV ID ID VL VL ST ST ST'
                       'EX EX EX EX EX EX RV RV RV RV RV RV';

  input {
    text-transform: uppercase;
  }

  > :nth-child(1) { grid-area: CN; } /* NAME */
  > :nth-child(2) { grid-area: CD; } /* DOCUMENT */
  > :nth-child(3) { grid-area: CG; } /* GROUP */

  > :nth-child(4) { grid-area: HR; } /* HR */

  > :nth-child(5) { grid-area: SC; } /* SECTOR */
  > :nth-child(6) { grid-area: SV; } /* SERVICE */
  > :nth-child(7) { grid-area: ID; } /* IDENTIFIER */
  > :nth-child(8) { grid-area: VL; } /* VALUE */
  > :nth-child(9) { grid-area: ST; } /* STATUS */

  > :nth-child(10) { grid-area: EX; } /* EXPENSES */
  > :nth-child(11) { grid-area: RV; } /* REVENUES */
`;
