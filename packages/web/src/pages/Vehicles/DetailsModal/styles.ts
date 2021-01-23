import { Form } from '@unform/web';
import styled from 'styled-components';

export const DetailsModalContainer = styled(Form)`
  display: grid;
  gap: 15px;

  grid-template-columns: 90px 70px 40px 40px 70px;

  grid-template-areas: 'CN CN CN CN CN'
                       'CD CD CG CG CG'
                       'HR HR HR HR HR'
                       'VP VR VR VC VC'
                       'VM VM VM VM VM'
                       'VT VT VT VS VS'
                       'AB AB AB AB AB';

  input, select {
    font-family: 'monospace';
  }

  .action-buttons {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
  }
`;
