import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { DropzoneModal } from '~/components/UI/DropzoneModal';
import { useLocalStorage } from '~/hooks';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

interface IUploadCRLVeModal {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
  vehicleId: string;
}

export const UploadCRLVeModal: React.FC<IUploadCRLVeModal> = ({ isOpen, onClose, onUploadSuccess, vehicleId }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoading, setInloading] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE UPLOAD CRLVe - */
  const onUploadCRLVe = async (files: File[]) => {
    if(vehicleId) {
      setInloading(true);

      const data = new FormData();
      data.append('file', files[0], files[0].name);

      try {
        await api.post(`/vehicles/${vehicleId}/crlve`, data, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
        // ;

        toast.success('CRLV-e enviado com sucesso!');
        onUploadSuccess();
        onClose();
      } catch(err) {
        handleHTTPRequestError(err);
      }

      setInloading(false);
    }
  };
  /* END HANDLE UPLOAD CRLVe */

  if(isOpen && !vehicleId) {
    toast.error('Erro ao abrir o upload de CRLV-e, tente novamente mais tarde.');
    return <></>;
  }

  return (
    <DropzoneModal
      isOpen={isOpen}
      header="ENVIAR CRLV-e"
      onClose={onClose}
      inLoading={inLoading}
      onDropAccepted={onUploadCRLVe}
    />
  );
};
