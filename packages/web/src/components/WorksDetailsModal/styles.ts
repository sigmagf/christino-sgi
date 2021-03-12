import { Form } from '@unform/web';
import { transparentize } from 'polished';
import styled from 'styled-components';

export const WorksDetailsModalForm = styled(Form)`
  display: grid;
  gap: 15px;
  width: 1080px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'CI CI CI CI CI CI CI CI CI CI CI CA'
                       'HR HR HR HR HR HR HR HR HR HR HR HR'
                       'SV SV SV SV ID ID ID ID VL VL ST ST'
                       'DT DT DT DT DT DT DT DT DT DT DT DT'
                       'HS HS HS HS HS HS HS HS HS HS HS HS'
                       'HT HT HT HT HT HT HT HT HT HT HT HT';

  table {
    width: 1080px;

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

  > :nth-child(1) { grid-area: CI; input { text-transform: uppercase; } } /* CLIENTID */
  > :nth-child(2) { grid-area: CA; } /* CLIENT ADD */

  > :nth-child(3) { grid-area: HR; } /* HR */

  > :nth-child(4) { grid-area: SV; } /* SERVICEid */
  > :nth-child(5) { grid-area: ID; input { text-transform: uppercase; } } /* IDENTIFIER */
  > :nth-child(6) { grid-area: VL; } /* VALUE */
  > :nth-child(7) { grid-area: ST; } /* STATUS */
  > :nth-child(8) { grid-area: DT; } /* DETAILS */
  > :nth-child(9) { grid-area: HS; } /* NEW HISTORY */
  > :nth-child(10) { grid-area: HT; } /* HISTORY */
`;

export const WorksDetailsActionButtons = styled.div<{editing: boolean}>`
  margin-top: ${({ editing }) => (editing ? '15px' : '0')};
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
