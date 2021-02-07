import { Form } from '@unform/web';
import { transparentize } from 'polished';
import styled from 'styled-components';

export const WorksDetailsModalForm = styled(Form)`
  display: grid;
  gap: 15px;
  width: 1080px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'CN CN CN CN CN CN CN CD CD CG CG CG'
                       'HR HR HR HR HR HR HR HR HR HR HR HR'
                       'SC SC SV SV SV ID ID ID VL VL ST ST'
                       'DT DT DT DT DT DT DT DT DT DT DT DT'
                       'HT HT HT HT HT HT HT HT HT HT HT HT';

  input {
    text-transform: uppercase;
  }

  table {
    table-layout: fixed;
    width: 1080px;
    
    tbody {
      display: block;
    }

    thead, tbody {
      max-height: 105px;
      width: 1080px;
      overflow-y: auto;

      th, td {
        height: 25px;
        font-family: 'Roboto Mono', monospace;
      }

      th {
        &:nth-child(1) { width: calc(1080px - 135px); text-align: left; }
        &:nth-child(2) { width: 125px; }
      }

      td {
        &:nth-child(1) { width: calc(1080px - 125px); }
        &:nth-child(2) { width: 125px; text-align: center; }
      }
    }
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
  > :nth-child(10) { grid-area: DT; } /* DETAILS */
  > :nth-child(11) { grid-area: HT; } /* HISTORY */
`;

export const WorksDetailsActionButtons = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

export const WorksDetailsLoadingContainer = styled.div`
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
