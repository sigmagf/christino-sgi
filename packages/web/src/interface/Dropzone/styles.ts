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
  border: 2px dashed ${({ theme }) => theme.secondary.main};
  background: ${({ theme }) => transparentize(0.95, theme.secondary.main)};
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100px;
  height: 100%;
  min-width: 500px;
  width: 100%;

  transition: height 200ms ease;

  ${({ isDragActive }) => isDragActive && dragActive}
  ${({ isDragReject }) => isDragReject && dragReject}
`;

export const UploadMessage = styled.p<IUploadMessageStyledProps>`
  font-weight: bold;
  color: ${({ theme, type }) => theme[type || 'primary'].contrastText};
`;
