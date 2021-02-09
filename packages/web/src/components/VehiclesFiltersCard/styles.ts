import styled from 'styled-components';

import { Card } from '~/components/interface/Card';

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

  > :nth-child(1) {
    display: grid;
    grid-gap: 10px;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: 'CN CN CN CN CN CN CG CG CG VS VS VS'
                         'VP VR VR VC VC VM VM VM VF VF VT VT';
  }

  form {
    input, select {
      text-transform: uppercase;
    }

    > :nth-child(1) { grid-area: CN };
    > :nth-child(2) { grid-area: CG };
    > :nth-child(3) { grid-area: VS };
    > :nth-child(4) { grid-area: VP };
    > :nth-child(5) { grid-area: VR };
    > :nth-child(6) { grid-area: VC };
    > :nth-child(7) { grid-area: VM };
    > :nth-child(8) { grid-area: VF };
    > :nth-child(9) { grid-area: VT };
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
  &:not(:empty) {
    margin-top: 15px;
  }

  grid-area: AC;
  display: flex;
  gap: 10px;

  justify-content: flex-end;
`;
