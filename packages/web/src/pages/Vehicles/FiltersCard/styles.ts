import styled from 'styled-components';

import { Card } from '~/components/Card';

interface IFiltersContainerStyledProps {
  open: boolean;
}

export const FiltersCard = styled(Card)`
  margin-bottom: 15px;
`;

export const FiltersContainer = styled.div<IFiltersContainerStyledProps>`
  position: relative;

  height: ${({ open }) => (open ? '171px' : '26px')};
  overflow: ${({ open }) => (open ? 'unset' : 'hidden')};

  transition: height 250ms ease;

  padding-bottom: ${({ open }) => (open ? '41px' : '26px')};
  margin-bottom: 15px;

  > :nth-child(1) {
    display: grid;
    grid-gap: 10px;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: 'CN CN CN CN CG VS'
                         'VP VR VC VM VM VF';
  }

  form {
    input, select {
      text-transform: uppercase;
    }
  }
`;

export const FiltersHeaders = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  background: ${({ theme }) => theme.secondary.main};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 5px;
  padding: 5px;

  text-align: center;

  cursor: pointer;
`;

export const FiltersCardActionButtons = styled.div`
  grid-area: AC;
  display: flex;
  gap: 10px;

  justify-content: flex-end;
`;
