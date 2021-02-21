import { Form } from '@unform/web';
import { transparentize } from 'polished';
import styled from 'styled-components';

export const DetailsModalForm = styled(Form)`
  display: grid;
  gap: 15px;
  width: 1080px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  grid-template-areas: 'NM NM NM NM NM NM NM DC DC GP GP GP'
                       'CE CE CE CE CE CE CE CE P1 P1 P2 P2';

  > :nth-child(1) { grid-area: NM; } /* NAME */
  > :nth-child(2) { grid-area: DC; } /* DOCUMENT */
  > :nth-child(3) { grid-area: GP; } /* GROUP */


  > :nth-child(4) { grid-area: CE; } /* EMAIL */
  > :nth-child(5) { grid-area: P1; } /* PHONE 1 */
  > :nth-child(6) { grid-area: P2; } /* PHONE 2 */
`;

export const VehicleDetailsActionButtons = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

export const VehicleDetailsLoadingContainer = styled.div`
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
