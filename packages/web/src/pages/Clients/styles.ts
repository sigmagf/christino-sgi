import styled from 'styled-components';

import { Card } from '~/components/UI/Card';

interface IFiltersContainerStyledProps {
  open: boolean;
}

export const FiltersCard = styled(Card)`
  display: grid;
  
  grid-template-areas: 'FI' 'AC';
  grid-gap: 15px;

  margin-bottom: 15px;
`;

export const FiltersSummary = styled.div`
  grid-area: SM;

  background: ${({ theme }) => theme.secondary.main};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 5px;
  padding: 5px;

  text-align: center;
  font-weight: bold;

  cursor: pointer;
`;

export const FiltersContainer = styled.div<IFiltersContainerStyledProps>`
  display: grid;
  grid-area: FI;

  grid-template-areas: 'SM' 'CT';
  height: ${({ open }) => (open ? '166px' : '26px')};
  overflow: hidden;

  transition: height 250ms ease;

  > :not(${FiltersSummary}) {
    grid-area: CT;

    display: grid;
    grid-gap: 10px;

    grid-template-areas: 'CN CN CN CN CN CN CN CG CG'
                          'VP VR VR VC VC VM VM VM VM';

    margin-top: 10px;
  }
`;

export const FiltersCardActionButtons = styled.div`
  grid-area: AC;
  display: flex;
  gap: 10px;

  justify-content: flex-end;
`;
