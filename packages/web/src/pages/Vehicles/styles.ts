import styled from 'styled-components';

import { Card } from '~/components/Card';

export const FiltersCard = styled(Card)`
  display: grid;
  
  grid-template-areas: 'FI' 'AC';
  grid-gap: 15px;

  margin-bottom: 15px;

  details{
    transition: height 250ms ease;

    :not([open]) {
      height: 26px;
    }
    
    [open] {
      height: 166px;
    }

    summary {
      background: ${({ theme }) => theme.secondary.main};
      box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
      border-radius: 5px;
      padding: 5px;
    }

    form {
      display: grid;
      grid-gap: 10px;

      grid-template-areas: 'CN CN CN CN CN CN CN CG CG'
                           'VP VR VR VC VC VM VM VM VM';

      margin-top: 10px;
    }
  }
`;

export const FiltersCardActionButtons = styled.div`
  display: flex;
  gap: 10px;

  justify-content: flex-end;
`;
