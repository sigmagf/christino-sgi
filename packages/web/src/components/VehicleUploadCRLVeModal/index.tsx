import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { useLocalStorage } from '~/hooks';
import { Dropzone } from '~/interface/Dropzone';
import { Modal } from '~/interface/Modal';
import { api } from '~/utils/api';

interface IImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
  vehicleId: string;
}

export const VehiclesDetailsUploadCRLVeModal: React.FC<IImportModalProps> = ({ isOpen, onClose, onUploadSuccess, vehicleId }) => {
  const storage = useLocalStorage();

  const [inLoading, setInLoading] = useState(false);

  const onFileUploaded = async (files: File[]) => {
    setInLoading(true);

    try {
      const data = new FormData();
      data.append('file', files[0]);

      await api.post(`/vehicles/crlve/upload/${vehicleId}`, data, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      onUploadSuccess();
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }

    onClose();
    setInLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} haveHeader={false}>
        {inLoading ? (
          <ReactLoading type="bars" />
        ) : (
          <Dropzone maxFiles={1} accept="application/pdf" onDropAccepted={onFileUploaded} />
        )}
      </Modal>
    </>
  );
};
