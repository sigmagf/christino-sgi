import { IVehicle } from '@christino-sgi/common';
import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/components/UI/Button';
import { Input } from '~/components/UI/Form';
import { Modal } from '~/components/UI/Modal';
import { useLocalStorage } from '~/hooks';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { onDocumentInputFocus, onDocumentInputBlur } from '~/utils/handleInputFormat';

import { DetailsDownForm } from './styles';
import { withdrawalPrintPage } from './withdrawalPrintPage';

interface IFormData {
  name: string;
  document: string;
  details: string;
}

interface IUploadWithdrawalModal {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: IVehicle;
}

export const WithdrawalProtocolModal: React.FC<IUploadWithdrawalModal> = ({ isOpen, onClose, vehicle }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  /* END BOOLEAN STATES */

  /* - HANDLE EMIT WITHDRAWAL PROTOCOL - */
  const onDownVehicle: SubmitHandler<IFormData> = async (data) => {
    if(vehicle) {
      try {
        const scheme = yup.object().shape({ name: yup.string().required('Nome é obrigatório.') });
        await scheme.validate(data, { abortEarly: false });

        // eslint-disable-next-line no-restricted-globals
        const win = window.open('', 'popup', `width=${screen.width},height=${screen.height}`);
        const baseURL = `${window.location.protocol}//${window.location.host}`;

        if(win) {
          win.document.body.innerHTML = withdrawalPrintPage(vehicle, data, baseURL);

          await api.put<IVehicle>(`/vehicles/${vehicle.id}`, { ...vehicle, status: 1 }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

          toast.success('Veículo baixado com sucesso! Não se esqueça de enviar a baixa ou o ATPV-e!');
          onClose();
        }
      } catch(err) {
        if(err instanceof yup.ValidationError) {
          err.inner.forEach((yupError) => toast.error(yupError.message));
        } else {
          handleHTTPRequestError(err);
        }
      }
    }
  };
  /* END HANDLE EMIT WITHDRAWAL PROTOCOL */

  if(isOpen && !vehicle) {
    toast.error('Erro ao abrir o upload de Protocolo de baixa ou ATPV-e, tente novamente mais tarde.');
    return <></>;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} haveHeader header="DADOS DE QUEM ESTA RETIRANDO">
      <DetailsDownForm ref={formRef} onSubmit={onDownVehicle}>
        <Input name="name" label="NOME" />
        <Input name="document" label="CPF/CNPJ" maxLength={14} onFocus={() => onDocumentInputFocus(formRef)} onBlur={() => onDocumentInputBlur(formRef)} />
        <Input name="details" label="DETAILHES" />
        <Button variant="success">EMITIR BAIXA</Button>
      </DetailsDownForm>
    </Modal>
  );
};
