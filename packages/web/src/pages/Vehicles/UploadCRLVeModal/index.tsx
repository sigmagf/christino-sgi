import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { Dropzone } from '~/components/Dropzone';
import { Modal } from '~/components/Modal';
import { useLocalStorage } from '~/hooks';
import { IVehicle } from '~/interfaces';
import { api } from '~/utils/api';

interface IImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
  onUploadError: () => void;
  vehicleId: string;
}

interface IRequestError extends Omit<IVehicle, 'id'|'updated_at'|'created_at'|'client'> {
  error: string;
}

export const VehiclesUploadCRLVeModal: React.FC<IImportModalProps> = ({ isOpen, onClose, onUploadSuccess, onUploadError, vehicleId }) => {
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

      onUploadError();
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
          <Dropzone
            maxFiles={1}
            accept="application/pdf"
            onDropAccepted={onFileUploaded}
          />
        )}
      </Modal>
    </>
  );
};
