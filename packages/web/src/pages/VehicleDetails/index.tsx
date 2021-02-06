import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import { FaAngleLeft, FaEye, FaUpload } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { Layout } from '~/components/Layout';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { IClient, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { vehicleStatus as status } from '~/utils/commonSelectOptions';
import { formatCPForCNPJ } from '~/utils/formatCPForCNPJ';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { VehicleDetailsLoadingContainer, VehicleDetailsActionButtons, VehicleDetailsContainer, VehicleDetailsHeader } from './styles';
import { VehiclesDetailsUploadCRLVeModal } from './UploadCRLVeModal';

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

export const VehiclesDetailsPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  const { id } = useParams();
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);
  const navigateHook = useNavigate();

  const [despPermission, setDespPermission] = useState(-1);
  const [inLoadingCRLVe, setInLoadingCRLVe] = useState(false);
  const [inSubmitProcess, setInSubmitProcess] = useState(false);

  const [editing, setEditing] = useState(false);
  const [clientSearched, setClientSearched] = useState(false);
  const [haveClient, setHaveClient] = useState(true);

  const [uploadCrlveModalOpen, setUploadCrlveModalOpen] = useState(false);

  const statusOptions = status.filter((e) => e.value > '0');
  const { data: vehicle, isValidating: inLoading, mutate: onVehicleChange, revalidate, error } = useSWR<IVehicle>(`/vehicles/${id}`, { revalidateOnFocus: false });

  /* - HANDLE GET CRLVe PDF FILE - */
  const handleGetCRLVe = async () => {
    setInLoadingCRLVe(true);

    try {
      const response = await api.get(`/vehicles/crlve/view/${id}`, {
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

      formRef.current.setFieldValue('document', formatCPForCNPJ(document));

      if(!validCPForCNPJ(document)) {
        toast.error('CPF/CNPJ inválido.');
        return;
      }

      getClient(document);
    }
  };
  /* END HANDLE DOCUMENT FORMAT */

  /* - SET MAXLENGTH- */
  const onBlurMaxLengths = (inputName: string, maxLength: number, fillString: string) => {
    if(formRef.current) {
      const inputVal: string = formRef.current.getFieldValue(inputName).replace(/\D/g, '');

      formRef.current.setFieldValue(inputName, inputVal.padStart(maxLength, fillString));
    }
  };
  /* END SET MAX LENGTH */

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
        await api.put(`/vehicles/${vehicle.id}`, { ...data }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        await api.post('/vehicles', { ...data }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      revalidate();
      setEditing(false);
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

  const onUploadCRLVeSuccess = () => {
    if(vehicle) {
      const newVehicleData = vehicle;
      newVehicleData.crlve_included = true;
      onVehicleChange(newVehicleData, false);
    }
  };

  if(despPermission === 0 || (!inLoading && error)) {
    return <Navigate to="/" />;
  }

  return (
    <Layout setPermissions={(perms) => setDespPermission(perms.desp_permission)}>
      <VehicleDetailsHeader>
        <Button variant="secondary" onClick={() => navigateHook('/vehicles')}><FaAngleLeft /></Button>
        <p>
          DETALHES DO VEÍCULO
        </p>
      </VehicleDetailsHeader>
      <VehicleDetailsContainer>
        <Form ref={formRef} onSubmit={onSubmit} initialData={vehicle && { ...vehicle, ...vehicle.client, document: formatCPForCNPJ(vehicle.client.document) }}>
          <Input disabled={inLoading || !editing || haveClient} name="name" label="NOME" />
          <Input disabled={inLoading || !editing || clientSearched} name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
          <Input disabled={inLoading || !editing || haveClient} name="group" label="GRUPO" />

          <hr />

          <Input disabled={inLoading || !editing} name="plate" label="PLACA" maxLength={7} />
          <Input disabled={inLoading || !editing} name="renavam" label="RENAVAM" maxLength={11} onBlur={() => onBlurMaxLengths('renavam', 11, '0')} />
          <Input disabled={inLoading || !editing} name="crv" label="CRV" maxLength={12} onBlur={() => onBlurMaxLengths('crv', 12, '0')} />
          <Input disabled={inLoading || !editing} name="brand_model" label="MARCA/MODELO" />
          <Input disabled={inLoading || !editing} name="type" label="TIPO" />
          <Select isDisabled={inLoading || !editing} name="status" label="STATUS" options={statusOptions} value={vehicle && status[vehicle.status]} />
          <Input disabled={inLoading || !editing} name="details" label="DETALHES" />
        </Form>
        <VehicleDetailsActionButtons>
          {(!editing && vehicle && vehicle.crlve_included) && (
            <Button variant="secondary" disabled={inLoading || inLoadingCRLVe} style={{ cursor: inLoadingCRLVe ? 'progress' : 'pointer' }} onClick={handleGetCRLVe}>
              <FaEye />&nbsp;&nbsp;&nbsp;CRLVe
            </Button>
          )}

          {despPermission >= 2 && (
            <>
              {(vehicle && !editing) && (
              <Button variant="info" disabled={inLoading} onClick={() => setUploadCrlveModalOpen(true)}>
                <FaUpload />&nbsp;&nbsp;&nbsp; CRLVe
              </Button>
              )}

              {editing ? (
                <>
                  <Button type="submit" variant="success" disabled={inLoading || inSubmitProcess} onClick={() => formRef.current && formRef.current.submitForm()}>
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
            </>
          )}
        </VehicleDetailsActionButtons>

        {inLoading && (
          <VehicleDetailsLoadingContainer>
            <ReactLoading type="bars" />
          </VehicleDetailsLoadingContainer>
        )}
      </VehicleDetailsContainer>
      <VehiclesDetailsUploadCRLVeModal
        isOpen={uploadCrlveModalOpen}
        onClose={() => setUploadCrlveModalOpen(false)}
        vehicleId={vehicle?.id || ''}
        onUploadSuccess={onUploadCRLVeSuccess}
      />
    </Layout>
  );
};
