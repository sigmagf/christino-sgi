import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect } from 'react';
import { FaEye, FaUpload } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useLocalStorage } from '~/hooks';
import { Button } from '~/interface/Button';
import { Dropzone } from '~/interface/Dropzone';
import { Input, Select } from '~/interface/Form';
import { Modal } from '~/interface/Modal';
import { IClient, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { vehicleStatus as status } from '~/utils/commonSelectOptions';
import { formatDocument } from '~/utils/formatDocument';
import { onDocumentBlur, onDocumentFocus } from '~/utils/handleDocumentInputFormat';

import { ClientsDetailsModal } from '../ClientsDetailsModal';
import { VehiclesDownModal } from '../VehiclesDownModal';
import { DetailsModalForm, VehicleDetailsActionButtons, VehicleDetailsLoadingContainer } from './styles';

interface IFormData {
  clientId: string;
  plate: string;
  renavam: string;
  crv: string;
  brandmodel: string;
  type: string;
  status: string;
  details: string;
}

interface IVehiclesDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: IVehicle;
  despPermission: number;
  onChangeSuccess: (vehicle: IVehicle) => void;
  onCRLVeViewClick: (id: string) => Promise<void>;
}

export const VehiclesDetailsModal: React.FC<IVehiclesDetailsModalProps> = ({ isOpen, onClose, vehicle, despPermission, onChangeSuccess, onCRLVeViewClick }) => {
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);

  const [inLoadingCRLVe, setInLoadingCRLVe] = useState(false);
  const [inSubmitProcess, setInSubmitProcess] = useState(false);

  const [editing, setEditing] = useState(false);
  const [cadClientModal, setCadClientModal] = useState(false);
  const [downModal, setDownModal] = useState(false);

  const [uploadCrlveModalOpen, setUploadCrlveModalOpen] = useState(false);

  /* - HANDLE GET CRLVe PDF FILE - */
  const handleGetCRLVe = async () => {
    if(vehicle) {
      setInLoadingCRLVe(true);
      await onCRLVeViewClick(vehicle.id);
      setInLoadingCRLVe(false);
    }
  };
  /* END HANDLE GET CRLVe PDF FILE */

  /* - SEARCH CLIENT IN DATABASE - */
  const getClient = async (document: string) => {
    if(formRef.current) {
      try {
        const client = await api.get<IClient[]>(`/clients?noPagination=true&document=${document}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        formRef.current.setFieldValue('name', client.data[0]?.name || '');
        formRef.current.setFieldValue('group', client.data[0]?.group || '');
        formRef.current.setFieldValue('clientId', client.data[0]?.id || '');

        if(!client.data[0]) {
          toast.error('Cliente não cadastrado.');
          setCadClientModal(true);
        }
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
  };
  /* END SEARCH CLIENT IN DATABASE */

  /* - SET MAXLENGTH- */
  const onBlurMaxLengths = (inputName: string, maxLength: number, fillString: string) => {
    if(formRef.current) {
      const inputVal: string = formRef.current.getFieldValue(inputName).replace(/\D/g, '');

      if(inputVal) {
        formRef.current.setFieldValue(inputName, inputVal.padStart(maxLength, fillString));
      }
    }
  };
  /* END SET MAX LENGTH */

  /* - UPLOAD CRLVE - */
  const onCRLVeUpload = async (files: File[]) => {
    if(vehicle) {
      setInLoadingCRLVe(true);

      const data = new FormData();
      data.append('file', files[0], files[0].name);

      try {
        await api.post(`/vehicles/${vehicle.id}/crlve`, data, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
        onChangeSuccess({ ...vehicle, crlveIncluded: true });
      } catch(err) {
        if(err.message === 'Network Error') {
          toast.error('Verifique sua conexão com a internet.');
        } else if(err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Ocorreu um erro inesperado.');
        }
      }

      setInLoadingCRLVe(false);
    }
  };
  /* END UPLOAD CRLVE */

  /* - HANDLE DOWN VEHICLE - */
  const handleDownVehicle = async () => {
    setDownModal(false);

    if(vehicle) {
      try {
        await api.put<IVehicle>(`/vehicles/${vehicle.id}`, { ...vehicle, status: 1 }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        onClose();
        toast.success('Veículo baixado com sucesso!');
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
    }
  };
  /* END HANDLE DOWN VEHICLE */

  /* - SAVE OR UPDATE VEHICLE - */
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setInSubmitProcess(true);

    try {
      const scheme = yup.object().shape({
        clientId: yup.string().required('Erro ao vincular o cliente.'),
        plate: yup.string()
          .min(7, 'Placa inválida.')
          .max(7, 'Placa inválida.')
          .required('A placa é obrigatória.'),
        renavam: yup.string()
          .max(11, 'O renavam deve ter no maximo 11 caracteres.')
          .required('O renavam é obrigatório.'),
        brandModel: yup.string().required('A marca/modelo é obrigatória.'),
        type: yup.string().required('O tipo é obrigatória.'),
      });

      await scheme.validate(data, { abortEarly: false });

      if(vehicle) {
        await api.put<IVehicle>(`/vehicles/${vehicle.id}`, data, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        await api.post<IVehicle>('/vehicles', data, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      onClose();
      toast.success(`Veículo ${vehicle ? 'atualizado' : 'cadastrado'} com sucesso!`);
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

  const handleVehicleExclude = async () => {
    if(vehicle) {
      setInSubmitProcess(true);

      try {
        if(window.confirm('Deseja realmente excluir este veículo?')) {
          await api.delete(`/vehicles/${vehicle.id}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
          toast.success('Veículo excluido com sucesso!');
          onClose();
        }
      } catch(err) {
        if(err.message === 'Network Error') {
          toast.error('Verifique sua conexão com a internet.');
        } else if(err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Ocorreu um erro inesperado.');
        }
      }

      setInSubmitProcess(false);
    }
  };

  useEffect(() => {
    if(vehicle) {
      setInLoadingCRLVe(false);
      setInSubmitProcess(false);
      setEditing(false);
      setUploadCrlveModalOpen(false);
    } else {
      setInLoadingCRLVe(false);
      setInSubmitProcess(false);
      setEditing(true);
      setUploadCrlveModalOpen(false);
    }

    setCadClientModal(false);
  }, [vehicle]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        haveHeader
        header={`${vehicle ? 'ALTERAR' : 'CRIAR'} VEÍCULO`}
      >
        <DetailsModalForm
          ref={formRef}
          onSubmit={onSubmit}
          initialData={
            vehicle && {
              ...vehicle.client,
              ...vehicle,
              document: formatDocument(vehicle.client.document),
              status: status.find((el) => el.value === vehicle?.status.toString()),
            }
          }
        >
          <div className="inputs-hidden">
            <Input type="hidden" name="clientId" />
          </div>
          <Input disabled name="name" label="NOME" />
          <Input disabled={!editing} name="document" label="DOCUMENTO" onFocus={() => onDocumentFocus(formRef)} onBlur={() => onDocumentBlur(formRef, getClient)} />
          <Input disabled name="group" label="GRUPO" />

          <hr />

          <Input disabled={!editing} name="plate" label="PLACA" maxLength={7} />
          <Input disabled={!editing} name="renavam" label="RENAVAM" maxLength={11} onBlur={() => onBlurMaxLengths('renavam', 11, '0')} />
          <Input disabled={!editing} name="crv" label="CRV" maxLength={12} onBlur={() => onBlurMaxLengths('crv', 12, '0')} />
          <Input disabled={!editing} name="brandModel" label="MARCA/MODELO" />
          <Input disabled={!editing} name="type" label="TIPO" />
          <Select isDisabled={!editing} name="status" label="STATUS" options={status.filter((el) => el.value > '1')} />
          <Input disabled={!editing} name="details" label="DETALHES" />
        </DetailsModalForm>
        <VehicleDetailsActionButtons>
          {(!editing && vehicle && vehicle.crlveIncluded) && (
            <Button type="button" variant="secondary" disabled={inLoadingCRLVe} style={{ cursor: inLoadingCRLVe ? 'progress' : 'pointer' }} onClick={handleGetCRLVe}>
              <FaEye />&nbsp;&nbsp;&nbsp;CRLVe
            </Button>
          )}

          {despPermission >= 2 && (
            <>
              {(vehicle && !editing) && (
                <Button type="button" variant="info" disabled={inSubmitProcess} onClick={() => setUploadCrlveModalOpen(true)} title="ENVIAR CRLVe">
                  <FaUpload />&nbsp;&nbsp;&nbsp; CRLVe
                </Button>
              )}

              {editing ? (
                <>
                  <Button type="submit" variant="success" disabled={inSubmitProcess} onClick={() => formRef.current && formRef.current.submitForm()}>
                    {vehicle ? 'SALVAR' : 'INCLUIR'}
                  </Button>

                  {vehicle && (
                    <>
                      {vehicle.status > 1 && (
                        <Button type="button" variant="error" disabled={inSubmitProcess} onClick={() => setDownModal(true)}>
                          BAIXAR VEÍCULO
                        </Button>
                      )}

                      {despPermission >= 3 && (
                        <Button type="button" variant="error" disabled={inSubmitProcess} onClick={handleVehicleExclude}>
                          EXCLUIR
                        </Button>
                      )}

                      <Button type="button" variant="warning" disabled={inSubmitProcess} onClick={() => setEditing(false)}>
                        CANCELAR
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <Button variant="warning" disabled={inSubmitProcess} onClick={() => setEditing(true)}>
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

      <Modal isOpen={uploadCrlveModalOpen} onRequestClose={onClose} haveHeader={false}>
        {inLoadingCRLVe ? (
          <ReactLoading type="bars" />
        ) : (
          <Dropzone maxFiles={1} accept="application/pdf" onDropAccepted={onCRLVeUpload} />
        )}
      </Modal>

      <ClientsDetailsModal
        cliePermission={2}
        isOpen={cadClientModal}
        onClose={() => setCadClientModal(false)}
        onChangeSuccess={() => onDocumentBlur(formRef, getClient)}
      />

      <VehiclesDownModal
        isOpen={downModal}
        onClose={() => setDownModal(false)}
        onDownSuccess={handleDownVehicle}
        vehicle={vehicle}
      />
    </>
  );
};
