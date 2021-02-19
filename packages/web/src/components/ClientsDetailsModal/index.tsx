import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useLocalStorage } from '~/hooks';
import { Button } from '~/interface/Button';
import { Input } from '~/interface/Form';
import { Modal } from '~/interface/Modal';
import { IClient, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { formatDocument } from '~/utils/formatDocument';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { UserPermissionsContext } from '../Layout';
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
  onClose: () => void;
  client?: IClient;
  onChangeSuccess: () => void;
}

export const ClientsDetailsModal: React.FC<IVehiclesDetailsModalProps> = ({ isOpen, onClose, client, onChangeSuccess }) => {
  const { cliePermission } = useContext(UserPermissionsContext);
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);

  const [inSubmitProcess, setInSubmitProcess] = useState(false);
  const [editing, setEditing] = useState(false);

  /* - HANDLE DOCUMENT FORMAT - */
  const onDocumentFocus = () => {
    if(formRef.current) {
      const document = formRef.current.getFieldValue('document').replace(/\D/g, '');
      formRef.current.setFieldValue('document', document);
    }
  };

  const onDocumentBlur = () => {
    if(formRef.current) {
      const document = formRef.current.getFieldValue('document').replace(/\D/g, '');

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

  /* - HANDLE PHONE FORMAT - */
  const onPhoneFocus = (field: string) => {
    if(formRef.current) {
      const phone = formRef.current.getFieldValue(field);
      formRef.current.setFieldValue(field, phone.replace(/\D/g, ''));
    }
  };

  const onPhoneBlur = (field: string) => {
    if(formRef.current) {
      const phone = formRef.current.getFieldValue(field).replace(/\D/g, '');
      let formatedPhone = phone;

      if(phone.length === 10) {
        formatedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`;
      }

      if(phone.length === 11) {
        formatedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
      }

      formRef.current.setFieldValue(field, formatedPhone);
    }
  };
  /* END HANDLE PHONE FORMAT */

  /* - SAVE OR UPDATE CLIENT - */
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setInSubmitProcess(true);

    try {
      const scheme = yup.object().shape({
        name: yup.string().max(128, 'O nome deve ter no máximo 128 caracteres').required('Nome é obrigatório'),
        document: yup.string()
          .min(11, 'Documento deve ter pelo menos 11 caracteres (CPF).')
          .max(14, 'Documento deve ter no maximo 14 caracteres (CNPJ).')
          .test('validate-document', 'Documento inválido.', (el) => validCPForCNPJ(el || ''))
          .required('Documento é obrigatório.'),
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
      onChangeSuccess();
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
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        haveHeader
        header={`${client ? 'ALTERAR' : 'CRIAR'} CLIENTE`}
      >
        <DetailsModalForm
          ref={formRef}
          onSubmit={onSubmit}
          initialData={client && {
            ...client,
            document: formatDocument(client.document),
          }}
        >
          <Input disabled={!editing} name="name" label="NOME" />
          <Input disabled={!editing} name="document" label="CPF/CNPJ" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
          <Input disabled={!editing} name="group" label="GRUPO" />

          <Input disabled={!editing} name="email" label="E-MAIL" />
          <Input disabled={!editing} name="phone1" label="TELEFONE 1" maxLength={11} onFocus={() => onPhoneFocus('phone1')} onBlur={() => onPhoneBlur('phone1')} />
          <Input disabled={!editing} name="phone2" label="TELEFONE 2" maxLength={11} onFocus={() => onPhoneFocus('phone2')} onBlur={() => onPhoneBlur('phone2')} />
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
