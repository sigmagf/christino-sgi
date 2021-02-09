import React from 'react';
import ReactDropzone, { DropzoneProps, DropEvent } from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

interface IDropzoneProps extends DropzoneProps {
  onDropAccepted: <T extends File>(files: T[], event: DropEvent) => void;
}

export const Dropzone: React.FC<IDropzoneProps> = ({ onDropAccepted, ...props }) => {
  const handleMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if(!isDragActive) {
      return <UploadMessage>ARRASTE OU CLIQUE AQUI PARA ENVIAR O ARQUIVO</UploadMessage>;
    }

    if(isDragReject) {
      return <UploadMessage type="error">ARQUIVO NAO SUPORTADO</UploadMessage>;
    }

    return <UploadMessage type="success">SOLTE O ARQUIVO AQUI</UploadMessage>;
  };

  return (
    <ReactDropzone
      onDropAccepted={onDropAccepted}
      {...props}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
          <input {...getInputProps()} />
          {handleMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </ReactDropzone>
  );
};
