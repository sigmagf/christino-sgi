import { Form } from '@unform/web';
import { transparentize } from 'polished';
import styled from 'styled-components';

export const VehiclesDetailsForm = styled(Form)`
  display: grid;
  gap: 15px;
  width: 1080px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;

  grid-template-areas: 'CL CL CL CL CL CL CL CL CL CL CL CA'
                       'HR HR HR HR HR HR HR HR HR HR HR HR'
                       'VP VR VR VC VC VM VM VM VT VT VS VS'
                       'VD VD VD VD VD VD VD VD VD VD VD VD';

  input {
    text-transform: uppercase;
  }

  > :nth-child(1) { grid-area: CL; } /* CLIENTID */
  > :nth-child(2) { grid-area: CA; } /* CLIENTID */

  > :nth-child(3) { grid-area: HR; } /* HR */

  > :nth-child(4) { grid-area: VP; } /* PLATE */
  > :nth-child(5) { grid-area: VR; } /* RENAVAM */
  > :nth-child(6) { grid-area: VC; } /* CRV */
  > :nth-child(7) { grid-area: VM; } /* BRAND/MODEL */
  > :nth-child(8) { grid-area: VT; } /* TYPE */
  > :nth-child(9) { grid-area: VS; } /* STATUS */
  > :nth-child(10) { grid-area: VD; } /* DETAILS */
`;

export const VehiclesDetailsActionButtons = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

export const VehiclesDetailsLoadingContainer = styled.div`
  z-index: 999;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: ${({ theme }) => transparentize(0.90, theme.background)};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VehiclesDetailsDownForm = styled(Form)`
  display: grid;
  gap: 15px;
  width: 500px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 60px 60px 20px;

  grid-template-areas: 'CN CN'
                       'CD CG'
                       'SM SM';

  input {
    text-transform: uppercase;
  }

  > :nth-child(1) { grid-area: CN; } /* NAME */
  > :nth-child(2) { grid-area: CD; } /* DOCUMENT */
  > :nth-child(3) { grid-area: CG; } /* GROUP */
  > :nth-child(4) { grid-area: SM; } /* SUBMIT */
`;
