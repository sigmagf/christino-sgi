import { lighten, transparentize } from 'polished';
import styled from 'styled-components';

export const TableContainer = styled.table`
  width: 100%;
  box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
  border-radius: 10px;
  overflow: hidden;
  border-collapse: collapse;

  td, th {
    height: 50px;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  thead {
    tr {
      background: ${({ theme }) => theme.secondary.main};

      th {
        font-weight: 800;
      }
    }
  }

  tbody {
    tr {
      transition: background-color 250ms ease;

      :nth-child(even) {
        background: ${({ theme }) => theme.primary.main};
      }

      :nth-child(odd) {
        background: ${({ theme }) => lighten(0.05, theme.primary.main)};
      }

      :hover {
        background: ${({ theme }) => transparentize(0.95, theme.secondary.main)};
      }
    }
  }
`;
