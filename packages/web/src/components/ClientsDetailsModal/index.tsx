import { IClient, IVehicle } from '@christino-sgi/common';
import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useLocalStorage } from '~/hooks';
import { Button } from '~/components/UI/Button';
import { Input } from '~/components/UI/Form';
import { Modal } from '~/components/UI/Modal';
import { api } from '~/utils/api';
import { formatDocument } from '~/utils/formatString';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { onDocumentInputBlur, onDocumentInputFocus, onPhoneInputBlur, onPhoneInputFocus } from '~/utils/handleInputFormat';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { DetailsModalForm, VehicleDetailsActionButtons, VehicleDetailsLoadingContainer } from './styles';

interface IFormData {
  name: string;
  document: string;
  group: string;
  email: string;
  phone1: string;
  phone2: string;
}

interface IVehiclesDetailsModalProps {
  isOpen: boolean;
  client?: IClient;
  onClose: () => void;
  cliePermission: number;
}

export const ClientsDetailsModal: React.FC<IVehiclesDetailsModalProps> = ({ isOpen, onClose, client, cliePermission }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inSubmitProcess, setInSubmitProcess] = useState(false);
  const [editing, setEditing] = useState(false);
  /* END BOOLEAN STATES */

  /* - SAVE OR UPDATE CLIENT - */
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setInSubmitProcess(true);

    try {
      const scheme = yup.object().shape({
        name: yup.string().max(128, 'O nome deve ter no máximo 128 caracteres').required('Nome é obrigatório'),
        document: yup.string()
          .min(11, 'CPF/CNPJ deve ter pelo menos 11 caracteres.')
          .max(14, 'CPF/CNPJ  deve ter no maximo 14 caracteres.')
          .test('CPF/CNPJ inválido.', (el) => validCPForCNPJ(el || ''))
          .required('CPF/CNPJ é obrigatório.'),
        group: yup.string().max(32, 'O grupo deve ter no máximo 32 caracteres'),
        email: yup.string().max(128, 'O email deve ter no máximo 128 caracteres'),
        phone1: yup.string().max(11, 'O telefone 1 deve ter no máximo 11 caracteres'),
        phone2: yup.string().max(11, 'O telefone 2 deve ter no máximo 11 caracteres'),
      });

      const document = data.document.replace(/\D/g, '');
      const phone1 = data.phone1.replace(/\D/g, '');
      const phone2 = data.phone2.replace(/\D/g, '');
      await scheme.validate({ ...data, document, phone1, phone2 }, { abortEarly: false });

      if(client) {
        await api.put<IVehicle>(`/clients/${client.id}`, { ...data, document, phone1, phone2 }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        await api.post<IVehicle>('/clients', { ...data, document, phone1, phone2 }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      onClose();
      toast.success(`Cliente ${client ? 'atualizado' : 'cadastrado'} com sucesso!`);
    } catch(err) {
      if(err instanceof yup.ValidationError) {
        err.inner.forEach((yupError) => toast.error(yupError.message));
      } else {
        handleHTTPRequestError(err);
      }
    }

    setInSubmitProcess(false);
  };
  /* END SAVE OR UPDATE VEHICLE */

  const onEditClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    if(client) {
      setInSubmitProcess(false);
      setEditing(false);
    } else {
      setInSubmitProcess(false);
      setEditing(true);
    }
  }, [client]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} haveHeader header={`${client ? 'ALTERAR' : 'CRIAR'} CLIENTE`}>
        <DetailsModalForm ref={formRef} onSubmit={onSubmit} initialData={client && { ...client, document: formatDocument(client.document) }}>
          <Input disabled={!editing} name="name" label="NOME" />
          <Input
            disabled={!editing}
            name="document"
            label="CPF/CNPJ"
            maxLength={14}
            onFocus={() => onDocumentInputFocus(formRef)}
            onBlur={() => onDocumentInputBlur(formRef)}
          />
          <Input
            disabled={!editing}
            name="group"
            label="GRUPO"
          />
          <Input
            disabled={!editing}
            name="email"
            label="E-MAIL"
          />
          <Input
            disabled={!editing}
            name="phone1"
            label="TELEFONE 1"
            maxLength={11}
            onFocus={() => onPhoneInputFocus(formRef, 'phone1')}
            onBlur={() => onPhoneInputBlur(formRef, 'phone1')}
          />
          <Input
            disabled={!editing}
            name="phone2"
            label="TELEFONE 2"
            maxLength={11}
            onFocus={() => onPhoneInputFocus(formRef, 'phone2')}
            onBlur={() => onPhoneInputBlur(formRef, 'phone2')}
          />
        </DetailsModalForm>

        <VehicleDetailsActionButtons>
          {cliePermission >= 2 && (
            <>
              {editing ? (
                <>
                  <Button type="submit" variant="success" disabled={inSubmitProcess} onClick={() => formRef.current && formRef.current.submitForm()}>
                    {client ? 'SALVAR' : 'INCLUIR'}
                  </Button>
                  {client && (
                  <Button variant="warning" disabled={inSubmitProcess} onClick={() => setEditing(false)}>
                    CANCELAR
                  </Button>
                  )}
                </>
              ) : (
                <Button variant="warning" disabled={inSubmitProcess} onClick={onEditClick}>
                  EDITAR
                </Button>
              )}
            </>
          )}
        </VehicleDetailsActionButtons>

        {inSubmitProcess && (
          <VehicleDetailsLoadingContainer>
            <ReactLoading type="bars" />
          </VehicleDetailsLoadingContainer>
        )}
      </Modal>
    </>
  );
};
