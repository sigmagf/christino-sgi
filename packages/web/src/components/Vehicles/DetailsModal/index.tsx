import { IVehicle } from '@christino-sgi/common';
import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect } from 'react';
import { FaEye, FaPlus, FaUpload } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/components/UI/Button';
import { Input, Select } from '~/components/UI/Form';
import { Modal } from '~/components/UI/Modal';
import { useLocalStorage } from '~/hooks';
import { api } from '~/utils/api';
import { vehicleStatus as status } from '~/utils/commonSelectOptions';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { onInputBlurMaxLength } from '~/utils/handleInputFormat';

import { ClientsDetailsModal } from '../../ClientsDetailsModal';
import { ClientSearchInput } from '../../ClientSearchInput';
import { UploadCRLVeModal } from '../UploadCRLVeModal';
import { UploadWithdrawalModal } from '../UploadWithdrawalModal';
import { WithdrawalProtocolModal } from '../WithdrawalProtocolModal';
import { VehiclesDetailsForm, VehiclesDetailsActionButtons, VehiclesDetailsLoadingContainer } from './styles';

interface IFormDetailsData {
  clientId: string;
  plate: string;
  renavam: string;
  crv: string;
  brandModel: string;
  type: string;
  status: string;
  details: string;
}

interface IVehiclesDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: IVehicle;
  onChange: (vehicle: IVehicle) => void;
  onCRLVeViewClick: (id: string) => Promise<void>;
  despPermission: number;
  cliePermission: number;
}

export const DetailsModal: React.FC<IVehiclesDetailsModalProps> = ({ isOpen, onClose, vehicle, onChange, onCRLVeViewClick, despPermission, cliePermission }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const formDetailsRef = useRef<FormHandles>(null);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoadingFile, setInLoadingFile] = useState(false);
  const [inSubmitProcess, setInSubmitProcess] = useState(false);
  const [editing, setEditing] = useState(false);
  const [uploadWithdrawalModal, setUploadWithdrawalModal] = useState(false);
  const [uploadCRLVeModal, setUploadCRLVeModal] = useState(false);
  const [cadClientModal, setCadClientModal] = useState(false);
  const [downModal, setDownModal] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE GET CRLVe - */
  const handleGetCRLVe = async () => {
    if(vehicle) {
      setInLoadingFile(true);
      await onCRLVeViewClick(vehicle.id);
      setInLoadingFile(false);
    }
  };
  /* END HANDLE GET CRLVe */

  /* - HANDLE GET WITHDRAWAL - */
  const handleGetWithdrawal = async () => {
    if(vehicle) {
      setInLoadingFile(true);

      try {
        const response = await api.get(`/vehicles/${vehicle.id}/withdrawal`, { headers: { authorization: `Bearer ${storage.getItem('token')}` }, responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

        // eslint-disable-next-line no-restricted-globals
        const win = window.open(url, 'popup', `width=${screen.width},height=${screen.height}`);

        if(!win) {
          toast.error('Ative o popup em seu navegador.');
        }
      } catch(err) {
        handleHTTPRequestError(err);
      }

      setInLoadingFile(false);
    }
  };
  /* END HANDLE GET WITHDRAWAL */

  /* - HANDLE VEHICLE EXCLUDE - */
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
  /* END HANDLE VEHICLE EXCLUDE */

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
    if(isOpen) {
      if(vehicle) {
        setEditing(false);
      } else {
        setEditing(true);
      }
    } else {
      setEditing(false);
    }

    setInLoadingFile(false);
    setInSubmitProcess(false);
    setUploadCRLVeModal(false);
    setDownModal(false);
    setCadClientModal(false);
  }, [isOpen, vehicle]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} haveHeader header={`${vehicle ? 'ALTERAR' : 'CRIAR'} VEÍCULO`}>
        <VehiclesDetailsForm
          ref={formDetailsRef}
          onSubmit={onSubmit}
          initialData={
            vehicle && {
              ...vehicle,
              status: status.find((el) => el.value === vehicle?.status.toString()),
            }
          }
        >
          <ClientSearchInput
            disabled={!editing}
            defaultValue={vehicle && { value: vehicle.clientId, label: `${vehicle.client.document.padStart(14, '*')} - ${vehicle.client.name}` }}
          />
          <Button type="button" disabled={!editing} variant="info" style={{ maxHeight: 40, marginTop: 20 }} onClick={() => setCadClientModal(true)}><FaPlus /></Button>

          <hr />

          <Input disabled={!editing} name="plate" label="PLACA" maxLength={7} />
          <Input disabled={!editing} name="renavam" label="RENAVAM" maxLength={11} onBlur={() => { onInputBlurMaxLength(formDetailsRef, 'renavam', 11, '0'); }} />
          <Input disabled={!editing} name="crv" label="CRV" maxLength={12} onBlur={() => onInputBlurMaxLength(formDetailsRef, 'crv', 12, '0')} />
          <Input disabled={!editing} name="brandModel" label="MARCA/MODELO" />
          <Input disabled={!editing} name="type" label="TIPO" />
          <Select isDisabled={!editing} name="status" label="STATUS" options={status.filter((el) => el.value > '1')} />
          <Input disabled={!editing} name="details" label="DETALHES" />
        </VehiclesDetailsForm>
        <VehiclesDetailsActionButtons>
          {(!editing && vehicle) && (
            <>
              {vehicle.crlveIncluded && (
                <Button type="button" variant="secondary" disabled={inLoadingFile} onClick={handleGetCRLVe}>
                  <FaEye />&nbsp;&nbsp;&nbsp;VER CRLV-e
                </Button>
              )}
              {(vehicle.status === 1 && vehicle.withdrawalIncluded) && (
                <Button type="button" variant="secondary" disabled={inLoadingFile} onClick={handleGetWithdrawal}>
                  <FaEye />&nbsp;&nbsp;&nbsp;VER BAIXA
                </Button>
              )}
            </>
          )}

          {despPermission >= 2 && (
            <>
              {(vehicle && !editing) && (
                <>
                  <Button type="button" variant="info" disabled={inSubmitProcess} onClick={() => setUploadCRLVeModal(true)}>
                    <FaUpload />&nbsp;&nbsp;&nbsp;ENVIAR CRLVe
                  </Button>
                  {(vehicle.status === 1) && (
                    <Button type="button" variant="info" disabled={inSubmitProcess} onClick={() => setUploadWithdrawalModal(true)}>
                      <FaUpload />&nbsp;&nbsp;&nbsp;ENVIAR BAIXA
                    </Button>
                  )}
                </>
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

      <WithdrawalProtocolModal
        isOpen={downModal}
        onClose={() => setDownModal(false)}
        vehicle={vehicle}
      />
      <UploadCRLVeModal
        isOpen={uploadCRLVeModal}
        onClose={() => setUploadCRLVeModal(false)}
        onUploadSuccess={() => vehicle && onChange({ ...vehicle, crlveIncluded: true })}
        vehicleId={vehicle?.id || ''}
      />
      <UploadWithdrawalModal
        isOpen={uploadWithdrawalModal}
        onClose={() => setUploadWithdrawalModal(false)}
        onUploadSuccess={() => vehicle && onChange({ ...vehicle, withdrawalIncluded: true })}
        vehicleId={vehicle?.id || ''}
      />

      <ClientsDetailsModal
        isOpen={cadClientModal}
        cliePermission={cliePermission}
        onClose={() => setCadClientModal(false)}
      />
    </>
  );
};
