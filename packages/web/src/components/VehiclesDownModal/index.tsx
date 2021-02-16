import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/interface/Button';
import { Input } from '~/interface/Form';
import { Modal } from '~/interface/Modal';
import { IVehicle } from '~/interfaces';
import { formatDocument } from '~/utils/formatDocument';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { downPrintPage } from './downPage';
import { DownModalForm } from './styles';

interface IFormData {
  name: string;
  document: string;
  details: string;
}

interface IVehiclesDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownSuccess: () => void;
  vehicle?: IVehicle;
}

export const VehiclesDownModal: React.FC<IVehiclesDetailsModalProps> = ({ isOpen, onClose, onDownSuccess, vehicle }) => {
  const formRef = useRef<FormHandles>(null);

  if(!vehicle && isOpen) {
    toast.error('Nenhum veículo selecionado!');
    onClose();
  }

  /* - HANDLE DOCUMENT FORMAT - */
  const onDocumentFocus = () => {
    if(formRef.current) {
      const document = formRef.current.getFieldValue('document').replace(/\D/g, '');
      formRef.current.setFieldValue('document', document);
    }
  };

  const onDocumentBlur = () => {
    if(formRef.current) {
      const document: string = formRef.current.getFieldValue('document').replace(/\D/g, '');

      if(document.length !== 11 && document.length !== 14) {
        toast.error('CPF/CNPJ inválido.');
        return;
      }

      formRef.current.setFieldValue('document', formatDocument(document));

      if(!validCPForCNPJ(document)) {
        toast.error('CPF/CNPJ inválido.');
      }
    }
  };
  /* END HANDLE DOCUMENT FORMAT */

  /* - ON SUBMIT FORM - */
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    if(vehicle) {
      try {
        const scheme = yup.object().shape({ name: yup.string().required('Nome é obrigatório.') });
        await scheme.validate(data, { abortEarly: false });

        // eslint-disable-next-line no-restricted-globals
        const win = window.open('', 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=${screen.width},height=${screen.height}`);
        const baseURL = `${window.location.protocol}//${window.location.host}`;

        if(win) {
          win.document.body.innerHTML = downPrintPage(vehicle, data, baseURL);

          window.setTimeout(() => {
            win.print();
            win.close();
            onClose();

            onDownSuccess();
          }, 500);
        }
      } catch(err) {
        if(err instanceof yup.ValidationError) {
          err.inner.forEach((yupError) => toast.error(yupError.message));
        } else {
          toast.error('Ocorreu um erro inesperado.');
        }
      }
    }
  };
  /* END ON SUBMIT FORM */

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} haveHeader header="DADOS DE QUEM ESTA RETIRANDO">
        <DownModalForm ref={formRef} onSubmit={onSubmit}>
          <Input name="name" label="NOME" />
          <Input name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
          <Input name="details" label="DETAILHES" />
          <Button variant="success">EMITIR BAIXA</Button>
        </DownModalForm>
      </Modal>
    </>
  );
};
