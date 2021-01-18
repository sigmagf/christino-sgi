import { shade, transparentize } from 'polished';
import { DropzoneRootProps } from 'react-dropzone';
import styled, { css } from 'styled-components';

interface IDropContainerStyledProps extends DropzoneRootProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

interface IUploadMessageStyledProps {
  type?: 'error'|'success';
}

const dragActive = css`
  border-color: ${({ theme }) => theme.success.main};
  background: ${({ theme }) => transparentize(0.95, theme.success.main)};
`;

const dragReject = css`
  border-color: ${({ theme }) => theme.error.main};
  background: ${({ theme }) => transparentize(0.95, theme.error.main)};
`;

export const DropContainer = styled.div<IDropContainerStyledProps>`
  min-width: 500px;
  border: 2px dashed ${({ theme }) => theme.secondary.main};
  background: ${({ theme }) => transparentize(0.95, theme.secondary.main)};
  border-radius: 10px;
  cursor: pointer;

  height: 100px;

  transition: height 200ms ease;

  ${({ isDragActive }) => isDragActive && dragActive}
  ${({ isDragReject }) => isDragReject && dragReject}
`;

export const UploadMessage = styled.p<IUploadMessageStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-weight: bold;
  color: ${({ theme, type }) => theme[type || 'primary'].contrastText};
`;

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
