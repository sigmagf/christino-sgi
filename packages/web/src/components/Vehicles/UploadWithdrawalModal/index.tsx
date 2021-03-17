import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { DropzoneModal } from '~/components/UI/DropzoneModal';
import { useLocalStorage } from '~/hooks';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

interface IUploadWithdrawalModal {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
  vehicleId: string;
}

export const UploadWithdrawalModal: React.FC<IUploadWithdrawalModal> = ({ isOpen, onClose, onUploadSuccess, vehicleId }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoading, setInloading] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE UPLOAD WITHDRAWAL - */
  const onUploadWithdrawal = async (files: File[]) => {
    if(vehicleId) {
      setInloading(true);

      const data = new FormData();
      data.append('file', files[0], files[0].name);

      try {
        await api.post(`/vehicles/${vehicleId}/withdrawal`, data, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
        // onChange({ ...vehicle, withdrawalIncluded: true });

        toast.success('Protocolo de baixa ou ATPV-e enviado com sucesso!');
        onUploadSuccess();
        onClose();
      } catch(err) {
        handleHTTPRequestError(err);
      }

      setInloading(false);
    }
  };
  /* END HANDLE UPLOAD WITHDRAWAL */

  if(isOpen && !vehicleId) {
    toast.error('Erro ao abrir o upload de Protocolo de baixa ou ATPV-e, tente novamente mais tarde.');
    return <></>;
  }

  return (
    <DropzoneModal
      isOpen={isOpen}
      header="ENVIAR PROTOCOLO DE BAIXA OU ATPV-e"
      onClose={onClose}
      inLoading={inLoading}
      onDropAccepted={onUploadWithdrawal}
    />
  );
};
