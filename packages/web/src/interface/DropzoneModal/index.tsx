import React from 'react';
import { DropEvent } from 'react-dropzone';
import ReactLoading from 'react-loading';

import { Dropzone } from '../Dropzone';
import { Modal } from '../Modal';

interface IDropzoneModal {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  onDropAccepted: <T extends File>(files: T[], event: DropEvent) => void;
  inLoading: boolean;
}

export const DropzoneModal: React.FC<IDropzoneModal> = ({ header, inLoading, isOpen, onClose, onDropAccepted }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} header={header} fullCover centeredContent>
      {inLoading ? (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ReactLoading type="bars" />
        </div>
      ) : (
        <Dropzone maxFiles={1} accept="application/pdf" onDropAccepted={onDropAccepted} />
      )}
    </Modal>
  );
};
