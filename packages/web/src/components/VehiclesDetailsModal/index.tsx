import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { FaEye, FaPlus, FaUpload } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useLocalStorage } from '~/hooks';
import { Button } from '~/interface/Button';
import { DropzoneModal } from '~/interface/DropzoneModal';
import { Input, Select } from '~/interface/Form';
import { Modal } from '~/interface/Modal';
import { IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { vehicleStatus as status } from '~/utils/commonSelectOptions';
import { onDocumentInputBlur, onDocumentInputFocus } from '~/utils/handleDocumentInputFormat';
import { handleGetClientsToSelect } from '~/utils/handleGetClientsToSelect';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { onInputBlurMaxLength } from '~/utils/onInputBlurMaxLength';

import { ClientsDetailsModal } from '../ClientsDetailsModal';
import { UserPermissionsContext } from '../Layout';
import { downPrintPage } from './downPage';
import { VehiclesDetailsForm, VehiclesDetailsActionButtons, VehiclesDetailsLoadingContainer, VehiclesDetailsDownForm } from './styles';

interface IFormDetailsData {
  clientId: string;
  plate: string;
  renavam: string;
  crv: string;
  brandmodel: string;
  type: string;
  status: string;
  details: string;
}

interface IFormDownData {
  name: string;
  document: string;
  details: string;
}

interface IVehiclesDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: IVehicle;
  onChangeSuccess: (vehicle: IVehicle) => void;
  onCRLVeViewClick: (id: string) => Promise<void>;
}

export const VehiclesDetailsModal: React.FC<IVehiclesDetailsModalProps> = ({ isOpen, onClose, vehicle, onChangeSuccess, onCRLVeViewClick }) => {
  const { despPermission } = useContext(UserPermissionsContext);
  const storage = useLocalStorage();
  const formDetailsRef = useRef<FormHandles>(null);
  const formDownRef = useRef<FormHandles>(null);
  let timer: NodeJS.Timeout;

  const [inLoadingCRLVe, setInLoadingCRLVe] = useState(false);
  const [inSubmitProcess, setInSubmitProcess] = useState(false);
  const [editing, setEditing] = useState(false);

  const [clients, setClients] = useState<{ label: string; value: string }[]>([]);

  const [uploadCRLVeModal, setUploadCRLVeModal] = useState(false);
  const [cadClientModal, setCadClientModal] = useState(false);
  const [downModal, setDownModal] = useState(false);

  const onClientsInputChange = (param: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => { handleGetClientsToSelect(param, setClients); }, 1000);
  };

  /* - HANDLE GET CRLVe - */
  const handleGetCRLVe = async () => {
    if(vehicle) {
      setInLoadingCRLVe(true);
      await onCRLVeViewClick(vehicle.id);
      setInLoadingCRLVe(false);
    }
  };
  /* END HANDLE GET CRLVe */

  /* - HANDLE UPLOAD CRLVe - */
  const OnUploadCRLVe = async (files: File[]) => {
    if(vehicle) {
      setInLoadingCRLVe(true);

      const data = new FormData();
      data.append('file', files[0], files[0].name);

      try {
        await api.post(`/vehicles/${vehicle.id}/crlve`, data, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
        onChangeSuccess({ ...vehicle, crlveIncluded: true });
      } catch(err) {
        handleHTTPRequestError(err);
      }

      setInLoadingCRLVe(false);
    }
  };
  /* END HANDLE UPLOAD CRLVe */

  /* - HANDLE DOWN VEHICLE - */
  const onDownVehicle: SubmitHandler<IFormDownData> = async (data) => {
    if(vehicle) {
      try {
        const scheme = yup.object().shape({ name: yup.string().required('Nome é obrigatório.') });
        await scheme.validate(data, { abortEarly: false });

        // eslint-disable-next-line no-restricted-globals
        const win = window.open('', 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=${screen.width},height=${screen.height}`);
        const baseURL = `${window.location.protocol}//${window.location.host}`;

        if(win) {
          win.document.body.innerHTML = downPrintPage(vehicle, data, baseURL);

          await api.put<IVehicle>(`/vehicles/${vehicle.id}`, { ...vehicle, status: 1 }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

          setDownModal(false);
          onClose();
          toast.success('Veículo baixado com sucesso!');
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
  /* END HANDLE DOWN VEHICLE */

  const onVehicleExclude = async () => {
    if(vehicle) {
      setInSubmitProcess(true);

      try {
        if(window.confirm('Deseja realmente excluir este veículo?')) {
          await api.delete(`/vehicles/${vehicle.id}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
          toast.success('Veículo excluido com sucesso!');
          onClose();
        }
      } catch(err) {
        handleHTTPRequestError(err);
      }

      setInSubmitProcess(false);
    }
  };

  /* - SAVE OR UPDATE VEHICLE - */
  const onSubmit: SubmitHandler<IFormDetailsData> = async (data) => {
    setInSubmitProcess(true);

    try {
      const scheme = yup.object().shape({
        clientId: yup.string().required('Erro ao vincular o cliente.'),
        plate: yup.string().min(7, 'Placa inválida.').max(7, 'Placa inválida.').required('A placa é obrigatória.'),
        renavam: yup.string().max(11, 'O renavam deve ter no maximo 11 caracteres.').required('O renavam é obrigatório.'),
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
      } else {
        handleHTTPRequestError(err);
      }
    }

    setInSubmitProcess(false);
  };
  /* END SAVE OR UPDATE VEHICLE */

  useEffect(() => {
    if(vehicle) {
      setEditing(false);
      setClients([{ label: vehicle.client.name, value: vehicle.clientId }]);
    } else {
      setEditing(true);
      setClients([]);
    }

    setInLoadingCRLVe(false);
    setInSubmitProcess(false);
    setUploadCRLVeModal(false);
    setDownModal(false);
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
        <VehiclesDetailsForm
          ref={formDetailsRef}
          onSubmit={onSubmit}
          initialData={
            vehicle && {
              ...vehicle,
              clientId: { value: vehicle.clientId, label: `${vehicle.client.document.padStart(14, '*')} - ${vehicle.client.name}` },
              status: status.find((el) => el.value === vehicle?.status.toString()),
            }
          }
        >
          <Select name="clientId" label="CLIENTE" options={clients} onInputChange={onClientsInputChange} />
          <Button type="button" variant="info" style={{ maxHeight: 40, marginTop: 20 }} onClick={() => setCadClientModal(true)}><FaPlus /></Button>

          <hr />

          <Input disabled={!editing} name="plate" label="PLACA" maxLength={7} />
          <Input disabled={!editing} name="renavam" label="RENAVAM" maxLength={11} onBlur={() => onInputBlurMaxLength(formDetailsRef, 'renavam', 11, '0')} />
          <Input disabled={!editing} name="crv" label="CRV" maxLength={12} onBlur={() => onInputBlurMaxLength(formDetailsRef, 'crv', 12, '0')} />
          <Input disabled={!editing} name="brandModel" label="MARCA/MODELO" />
          <Input disabled={!editing} name="type" label="TIPO" />
          <Select isDisabled={!editing} name="status" label="STATUS" options={status.filter((el) => el.value > '1')} />
          <Input disabled={!editing} name="details" label="DETALHES" />
        </VehiclesDetailsForm>
        <VehiclesDetailsActionButtons>
          {(!editing && vehicle && vehicle.crlveIncluded) && (
            <Button type="button" variant="secondary" disabled={inLoadingCRLVe} style={{ cursor: inLoadingCRLVe ? 'progress' : 'pointer' }} onClick={handleGetCRLVe}>
              <FaEye />&nbsp;&nbsp;&nbsp;CRLVe
            </Button>
          )}

          {despPermission >= 2 && (
            <>
              {(vehicle && !editing) && (
                <Button type="button" variant="info" disabled={inSubmitProcess} onClick={() => setUploadCRLVeModal(true)} title="ENVIAR CRLVe">
                  <FaUpload />&nbsp;&nbsp;&nbsp; CRLVe
                </Button>
              )}

              {editing ? (
                <>
                  <Button type="submit" variant="success" disabled={inSubmitProcess} onClick={() => formDetailsRef.current && formDetailsRef.current.submitForm()}>
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
                        <Button type="button" variant="error" disabled={inSubmitProcess} onClick={onVehicleExclude}>
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
        </VehiclesDetailsActionButtons>

        {inSubmitProcess && (
          <VehiclesDetailsLoadingContainer>
            <ReactLoading type="bars" />
          </VehiclesDetailsLoadingContainer>
        )}
      </Modal>

      <Modal isOpen={downModal} onRequestClose={() => setDownModal(false)} haveHeader header="DADOS DE QUEM ESTA RETIRANDO">
        <VehiclesDetailsDownForm ref={formDownRef} onSubmit={onDownVehicle}>
          <Input name="name" label="NOME" />
          <Input name="document" label="CPF/CNPJ" maxLength={14} onFocus={() => onDocumentInputFocus(formDownRef)} onBlur={() => onDocumentInputBlur(formDownRef)} />
          <Input name="details" label="DETAILHES" />
          <Button variant="success">EMITIR BAIXA</Button>
        </VehiclesDetailsDownForm>
      </Modal>

      <DropzoneModal isOpen={uploadCRLVeModal} header="ENVIAR CRLV-E" onClose={() => setUploadCRLVeModal(false)} inLoading={inLoadingCRLVe} onDropAccepted={OnUploadCRLVe} />

      <ClientsDetailsModal
        isOpen={cadClientModal}
        onClose={() => setCadClientModal(false)}
        onChangeSuccess={() => onDocumentInputBlur(formDetailsRef, (e) => handleGetClientsToSelect(e, setClients))}
      />
    </>
  );
};
