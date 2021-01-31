import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect } from 'react';
import { FaEye, FaUpload } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { Modal } from '~/components/Modal';
import { useLocalStorage } from '~/hooks';
import { IClient, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { vehicleStatus as status } from '~/utils/commonSelectOptions';
import { formatCPForCNPJ } from '~/utils/formatCPForCNPJ';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { VehiclesUploadCRLVeModal } from '../UploadCRLVeModal';
import { DetailsModalActionButtons, DetailsModalContainer, DetailsModalLoadingContainer } from './styles';

interface IFormData {
  name: string;
  document: string;
  group: string;
  plate: string;
  renavam: string;
  crv: string;
  brand_model: string;
  type: string;
  status: string;
}

interface IDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: IVehicle;
  desp_permission: number;
  onViewCRLVeClick: (id: string) => Promise<void>;
}

export const VehiclesDetailsModal: React.FC<IDetailsModalProps> = ({ isOpen, onClose, vehicle, desp_permission, onViewCRLVeClick }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  const [inLoading, setInLoading] = useState(false);
  const [inLoadingGetCRLVe, setInLoadingGetCRLVe] = useState(false);

  const [crlveIncloded, setCrlveIncluded] = useState(false);
  const [editing, setEditing] = useState(false);

  const [clientSearched, setClientSearched] = useState(false);
  const [haveClient, setHaveClient] = useState(true);

  const [uploadCrlveModalOpen, setUploadCrlveModalOpen] = useState(false);

  const onCloseHandler = () => {
    setInLoading(false);
    setHaveClient(true);
    setEditing(false);
    setClientSearched(false);
    setCrlveIncluded(false);
    onClose();
  };

  /* - SEARCH CLIENT IN DATABASE - */
  const getClient = async (document: string) => {
    if(formRef.current) {
      try {
        const client = await api.get<IClient[]>(`/clients?noPagination=true&document=${document}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        setHaveClient(client.data.length === 1);
        formRef.current.setFieldValue('name', client.data[0]?.name || '');
        formRef.current.setFieldValue('group', client.data[0]?.group || '');
        setClientSearched(true);
      } catch(err) {
        if(err.message === 'Network Error') {
          toast.error('Verifique sua conexão com a internet.');
        } else if(err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Ocorreu um erro inesperado.');
        }

        setHaveClient(false);
        setClientSearched(false);
      }
    }
  };
  /* END SEARCH CLIENT IN DATABASE */

  /* - DOCUMENT FORMAT HANDLER - */
  const onDocumentFocus = () => {
    if(formRef.current) {
      const document = formRef.current.getFieldValue('document').replace(/\D/g, '');
      formRef.current.setFieldValue('document', document);
    }
  };

  const onDocumentBlur = () => {
    if(formRef.current) {
      const document: string = formRef.current.getFieldValue('document').replace(/\D/g, '');

      if(document.length === 0 || (document.length !== 11 && document.length !== 14)) {
        toast.error('CPF/CNPJ inválido.');
        return;
      }

      formRef.current.setFieldValue('document', formatCPForCNPJ(document));

      if(!validCPForCNPJ(document)) {
        toast.error('CPF/CNPJ inválido.');
        return;
      }

      getClient(document);
    }
  };
  /* END DOCUMENT FORMAT HANDLER */

  /* - SET MAXLENGTH- */
  const onBlurMaxLengths = (inputName: string, maxLength: number, fillString: string) => {
    if(formRef.current) {
      const inputVal: string = formRef.current.getFieldValue(inputName).replace(/\D/g, '');

      formRef.current.setFieldValue(inputName, inputVal.padStart(maxLength, fillString));
    }
  };

  /* - SAVE OR UPDATE VEHICLE - */
  const onSubmit: SubmitHandler<IFormData> = async (data, { reset }) => {
    setInLoading(true);

    try {
      const scheme = yup.object().shape({
        name: yup.string().required('Nome é obrigatório'),
        document: yup.string()
          .min(11, 'Documento deve ter pelo menos 11 caracteres.')
          .max(14, 'Documento deve ter no maximo 14 caracteres.')
          .test('validate-document', 'Documento inválido.', (val) => validCPForCNPJ(val || ''))
          .required('Documento é obrigatório.'),
        plate: yup.string()
          .min(7, 'Placa inválida.')
          .max(7, 'Placa inválida.')
          .required('A placa é obrigatória.'),
        renavam: yup.string()
          .max(11, 'O renavam deve ter no maximo 11 caracteres.')
          .required('O renavam é obrigatório.'),
        crv: yup.string()
          .max(12, 'O crv deve ter no maximo 12 caracteres.')
          .required('O crv é obrigatório.'),
        brand_model: yup.string().required('A marca/modelo é obrigatória.'),
        type: yup.string().required('O tipo é obrigatória.'),
      });

      const document = data.document.replace(/\D/g, '');
      await scheme.validate({ ...data, document }, { abortEarly: false });

      if(vehicle) {
        await api.put(`/vehicles/${vehicle.id}`, { ...data, document }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        await api.post('/vehicles', { ...data, document }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      toast.success(`Veículo ${vehicle ? 'atualizado' : 'cadastrado'} com sucesso!`);
      reset();
      onCloseHandler();
    } catch(err) {
      if(err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          toast.error(error.message);
        });
      } else if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }

    setInLoading(false);
  };
  /* END SAVE OR UPDATE VEHICLE */

  const handleOnCRLVeViewClick = async () => {
    if(vehicle) {
      setInLoadingGetCRLVe(true);
      await onViewCRLVeClick(vehicle.id);
      setInLoadingGetCRLVe(false);
    }
  };

  useEffect(() => {
    if(vehicle) {
      setInLoading(false);
      setInLoadingGetCRLVe(false);

      setEditing(false);
      setClientSearched(false);
      setHaveClient(false);
      setCrlveIncluded(vehicle.crlve_included);

      setUploadCrlveModalOpen(false);
    } else {
      setInLoadingGetCRLVe(false);
      setInLoading(false);

      setEditing(true);
      setClientSearched(false);
      setHaveClient(true);
      setCrlveIncluded(false);

      setUploadCrlveModalOpen(false);
    }
  }, [isOpen, vehicle]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onCloseHandler} header={`${vehicle ? 'ALTERACAO' : 'CADASTRO'} DE VEICULOS`}>
        <DetailsModalContainer ref={formRef} onSubmit={onSubmit} initialData={vehicle && { ...vehicle.client, ...vehicle, status: status[vehicle.status] }}>
          <Input disabled={inLoading || haveClient || !editing} name="name" label="NOME" />
          <Input disabled={inLoading || !editing || clientSearched} name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
          <Input disabled={inLoading || haveClient || !editing} name="group" label="GRUPO" />

          <hr />

          <Input disabled={inLoading || !editing} name="plate" label="PLACA" maxLength={7} />
          <Input disabled={inLoading || !editing} name="renavam" label="RENAVAM" maxLength={11} onBlur={() => onBlurMaxLengths('renavam', 11, '0')} />
          <Input disabled={inLoading || !editing} name="crv" label="CRV" maxLength={12} onBlur={() => onBlurMaxLengths('crv', 12, '0')} />
          <Input disabled={inLoading || !editing} name="brand_model" label="MARCA/MODELO" />
          <Input disabled={inLoading || !editing} name="type" label="TIPO" />
          <Select isDisabled={inLoading || !editing} name="status" label="STATUS" options={[...status.filter((e) => e)]} isSearchable={false} />
          <Input disabled={inLoading || !editing} name="details" label="DETALHES" />
        </DetailsModalContainer>

        {(desp_permission === 1 && vehicle && crlveIncloded && !editing) && (
          <DetailsModalActionButtons>
            <Button
              variant="secondary"
              disabled={inLoading || inLoadingGetCRLVe}
              style={{ cursor: inLoadingGetCRLVe ? 'progress' : 'pointer' }}
              onClick={handleOnCRLVeViewClick}
            >
              <FaEye />&nbsp;&nbsp;&nbsp;CRLVe
            </Button>
          </DetailsModalActionButtons>
        )}

        {desp_permission >= 2 && (
        <DetailsModalActionButtons>
          {vehicle && (
            <>
              {(crlveIncloded && !editing) && (
                <Button
                  variant="secondary"
                  disabled={inLoading || inLoadingGetCRLVe}
                  style={{ cursor: inLoadingGetCRLVe ? 'progress' : 'pointer' }}
                  onClick={handleOnCRLVeViewClick}
                >
                  <FaEye />&nbsp;&nbsp;&nbsp;CRLVe
                </Button>
              )}

              <Button variant="info" disabled={inLoading} onClick={() => setUploadCrlveModalOpen(true)}>
                <FaUpload />&nbsp;&nbsp;&nbsp;{!crlveIncloded ? 'ENVIAR' : 'SUBSTITUIR'} CRLVe
              </Button>
            </>
          )}

          {editing ? (
            <>
              <Button type="submit" variant="success" disabled={inLoading} onClick={() => formRef.current && formRef.current.submitForm()}>
                {vehicle ? 'SALVAR' : 'INCLUIR'}
              </Button>
              {vehicle && (
                <Button variant="warning" disabled={inLoading} onClick={() => setEditing(false)}>
                  CANCELAR
                </Button>
              )}
            </>
          ) : (
            <Button variant="warning" disabled={inLoading} onClick={() => setEditing(true)}>
              EDITAR
            </Button>
          )}
        </DetailsModalActionButtons>
        )}

        {inLoading && (
        <DetailsModalLoadingContainer>
          <ReactLoading type="bars" />
        </DetailsModalLoadingContainer>
        )}
      </Modal>

      {vehicle && (
        <VehiclesUploadCRLVeModal
          isOpen={uploadCrlveModalOpen}
          onClose={() => setUploadCrlveModalOpen(false)}
          onUploadSuccess={() => setCrlveIncluded(true)}
          onUploadError={() => setCrlveIncluded(false)}
          vehicleId={vehicle.id}
        />
      )}
    </>
  );
};
