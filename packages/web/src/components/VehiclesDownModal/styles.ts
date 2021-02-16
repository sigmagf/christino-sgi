import { Form } from '@unform/web';
import styled from 'styled-components';

export const DownModalForm = styled(Form)`
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
