import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect } from 'react';
import { FaEye, FaUpload } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { Modal } from '~/components/Modal';
import { VehiclesDetailsUploadCRLVeModal } from '~/components/VehicleUploadCRLVeModal';
import { useLocalStorage } from '~/hooks';
import { IClient, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { vehicleStatus as status } from '~/utils/commonSelectOptions';
import { formatDocument } from '~/utils/formatDocument';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { DetailsModalForm, VehicleDetailsActionButtons, VehicleDetailsLoadingContainer } from './styles';

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
  details: string;
}

interface IVehiclesDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: IVehicle;
  despPermission: number;
}

export const VehiclesDetailsModal: React.FC<IVehiclesDetailsModalProps> = ({ isOpen, onClose, vehicle, despPermission }) => {
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);

  const [inLoadingCRLVe, setInLoadingCRLVe] = useState(false);
  const [inSubmitProcess, setInSubmitProcess] = useState(false);
  const [haveCRLVe, setHaveCRLVe] = useState(false);

  const [editing, setEditing] = useState(false);
  const [clientSearched, setClientSearched] = useState(false);
  const [haveClient, setHaveClient] = useState(true);

  const [uploadCrlveModalOpen, setUploadCrlveModalOpen] = useState(false);

  /* - HANDLE GET CRLVe PDF FILE - */
  const handleGetCRLVe = async () => {
    setInLoadingCRLVe(true);

    if(vehicle) {
      try {
        const response = await api.get(`/vehicles/crlve/view/${vehicle.id}`, {
          headers: { authorization: `Bearer ${storage.getItem('token')}` },
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        // eslint-disable-next-line no-restricted-globals
        window.open(url, 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=${screen.width},height=${screen.height}`);
      } catch(err) {
        if(err.message === 'Network Error') {
          toast.error('Verifique sua conexão com a internet.');
        } else if(err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Ocorreu um erro inesperado.');
        }
      }
    }

    setInLoadingCRLVe(false);
  };
  /* END HANDLE GET CRLVe PDF FILE */

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

  /* - SET MAXLENGTH- */
  const onBlurMaxLengths = (inputName: string, maxLength: number, fillString: string) => {
    if(formRef.current) {
      const inputVal: string = formRef.current.getFieldValue(inputName).replace(/\D/g, '');

      formRef.current.setFieldValue(inputName, inputVal.padStart(maxLength, fillString));
    }
  };
  /* END SET MAX LENGTH */

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

      if(document.length === 0 || (document.length !== 11 && document.length !== 14)) {
        toast.error('CPF/CNPJ inválido.');
        return;
      }

      formRef.current.setFieldValue('document', formatDocument(document));

      if(!validCPForCNPJ(document)) {
        toast.error('CPF/CNPJ inválido.');
        return;
      }

      getClient(document);
    }
  };
  /* END HANDLE DOCUMENT FORMAT */

  /* - SAVE OR UPDATE VEHICLE - */
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setInSubmitProcess(true);

    try {
      const scheme = yup.object().shape({
        name: yup.string().required('Nome é obrigatório'),
        document: yup.string()
          .min(11, 'Documento deve ter pelo menos 11 caracteres (CPF).')
          .max(14, 'Documento deve ter no maximo 14 caracteres (CNPJ).')
          .test('validate-document', 'Documento inválido.', (el) => validCPForCNPJ(el || ''))
          .required('Documento é obrigatório.'),
        plate: yup.string()
          .min(7, 'Placa inválida.')
          .max(7, 'Placa inválida.')
          .required('A placa é obrigatória.'),
        renavam: yup.string()
          .max(11, 'O renavam deve ter no maximo 11 caracteres.')
          .required('O renavam é obrigatório.'),
        brand_model: yup.string().required('A marca/modelo é obrigatória.'),
        type: yup.string().required('O tipo é obrigatória.'),
      });

      const document = data.document.replace(/\D/g, '');
      await scheme.validate({ ...data, document }, { abortEarly: false });
      if(vehicle) {
        await api.put(`/vehicles/${vehicle.id}`, { ...data, document }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        await api.post<IVehicle>('/vehicles', { ...data, document }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      setEditing(false);
      toast.success('Veículo atualizado com sucesso!');
    } catch(err) {
      if(err instanceof yup.ValidationError) {
        err.inner.forEach((yupError) => toast.error(yupError.message));
      } else if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }

    setInSubmitProcess(false);
  };
  /* END SAVE OR UPDATE VEHICLE */

  const onEditClick = () => {
    setEditing(true);
    setClientSearched(false);
    setHaveClient(true);
  };

  useEffect(() => {
    if(vehicle) {
      setInLoadingCRLVe(false);
      setInSubmitProcess(false);

      setEditing(false);
      setClientSearched(false);
      setHaveClient(true);

      setUploadCrlveModalOpen(false);
      setHaveCRLVe(vehicle.crlve_included);
    } else {
      setInLoadingCRLVe(false);
      setInSubmitProcess(false);

      setEditing(true);
      setClientSearched(false);
      setHaveClient(true);

      setUploadCrlveModalOpen(false);
      setHaveCRLVe(false);
    }
  }, [vehicle]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        haveHeader
        header={`${vehicle ? 'CRIAR' : 'ALTERAR'} IMPORTACAO DE VEICULOS`}
      >
        <DetailsModalForm ref={formRef} onSubmit={onSubmit} initialData={vehicle && { ...vehicle, ...vehicle.client, document: formatDocument(vehicle.client.document) }}>
          <Input disabled={!editing || haveClient} name="name" label="NOME" />
          <Input disabled={!editing || clientSearched} name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
          <Input disabled={!editing || haveClient} name="group" label="GRUPO" />

          <hr />

          <Input disabled={!editing} name="plate" label="PLACA" maxLength={7} />
          <Input disabled={!editing} name="renavam" label="RENAVAM" maxLength={11} onBlur={() => onBlurMaxLengths('renavam', 11, '0')} />
          <Input disabled={!editing} name="crv" label="CRV" maxLength={12} onBlur={() => onBlurMaxLengths('crv', 12, '0')} />
          <Input disabled={!editing} name="brand_model" label="MARCA/MODELO" />
          <Input disabled={!editing} name="type" label="TIPO" />
          <Select isDisabled={!editing} name="status" label="STATUS" options={status.filter((e) => e.value > '0')} value={vehicle && status[vehicle.status]} />
          <Input disabled={!editing} name="details" label="DETALHES" />
        </DetailsModalForm>
        <VehicleDetailsActionButtons>
          {(!editing && haveCRLVe) && (
            <Button variant="secondary" disabled={inLoadingCRLVe} style={{ cursor: inLoadingCRLVe ? 'progress' : 'pointer' }} onClick={handleGetCRLVe}>
              <FaEye />&nbsp;&nbsp;&nbsp;CRLVe
            </Button>
          )}

          {despPermission >= 2 && (
            <>
              {(vehicle && !editing) && (
                <Button variant="info" disabled={inSubmitProcess} onClick={() => setUploadCrlveModalOpen(true)}>
                  <FaUpload />&nbsp;&nbsp;&nbsp; CRLVe
                </Button>
              )}

              {editing ? (
                <>
                  <Button type="submit" variant="success" disabled={inSubmitProcess} onClick={() => formRef.current && formRef.current.submitForm()}>
                    SALVAR
                  </Button>
                  {vehicle && (
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
      <VehiclesDetailsUploadCRLVeModal
        isOpen={uploadCrlveModalOpen}
        onClose={() => setUploadCrlveModalOpen(false)}
        vehicleId={vehicle?.id || ''}
        onUploadSuccess={() => setHaveCRLVe(true)}
      />
    </>
  );
};
