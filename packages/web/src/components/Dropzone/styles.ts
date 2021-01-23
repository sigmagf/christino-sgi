import { transparentize } from 'polished';
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
  border-radius: 5px;
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
