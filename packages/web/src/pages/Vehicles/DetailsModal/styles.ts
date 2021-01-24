import { Form } from '@unform/web';
import { transparentize } from 'polished';
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
