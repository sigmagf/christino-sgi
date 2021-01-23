import { shade, transparentize } from 'polished';
import styled from 'styled-components';

export const TableResult = styled.div`
  position: relative;

  .action-buttons {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
`;

export const LoadingModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => transparentize(0.90, theme.background)};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorsGroup = styled.div`
  margin-bottom: 15px;
  max-height: 350px;
  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.primary.main}; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => shade(0.2, theme.primary.main)}; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => shade(0.3, theme.primary.main)}; 
  }

  details {
    border-radius: 5px;
    overflow: hidden;

    :not(:first-child) {
      margin-top: 5px;
    }

    summary {
      font-family: 'monospace';
      background-color: ${({ theme }) => theme.error.main};
      text-align: center;
      padding: 5px;
    }

    section {
      font-family: 'monospace';
      border: 1px solid ${({ theme }) => theme.error.main};
      text-align: center;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 5px;
    }
  }
`;
