import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useCallback, useState } from 'react';
import ReactLoading from 'react-loading';
import { NamedProps } from 'react-select';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { Modal } from '~/components/Modal';
import { useLocalStorage } from '~/hooks';
import { IClient, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { formatCPForCNPJ } from '~/utils/formatCPForCNPJ';
import { statusConverter } from '~/utils/statusConverter';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { DetailsModalContainer, DetailsModalLoadingContainer } from './styles';

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
}

export const VehiclesDetailsModal: React.FC<IDetailsModalProps> = ({ isOpen, onClose, vehicle }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  const [inLoading, setInLoading] = useState(false);
  const [haveClient, setHaveClient] = useState(true);

  const onCloseHandler = () => {
    setInLoading(false);
    setHaveClient(true);
    onClose();
  };

  /* - DEFINE INITIAL DATA - */
  const initialData = {
    name: vehicle?.client.name || '',
    document: formatCPForCNPJ(vehicle?.client.document || ''),
    group: vehicle?.client.group || '',

    plate: vehicle?.plate || '',
    renavam: vehicle?.renavam || '',
    crv: vehicle?.crv || '',
    brand_model: vehicle?.brand_model || '',
    type: vehicle?.type || '',
    status: { value: vehicle?.status || '0', label: statusConverter(vehicle?.status || '') },
  };
  /* END DEFINE INITIAL DATA */

  /* - DEFINE STATUS OPTIONS - */
  const status: NamedProps['options'] = [
    { value: '0', label: 'BAIXADO' },
    { value: '1', label: 'CRLVe' },
    { value: '2', label: 'CRV' },
    { value: '3', label: 'OUTRO' },
  ];
  /* END DEFINE STATUS OPTIONS */

  /* - SEARCH CLIENT IN DATABASE - */
  const getClient = async (document: string) => {
    if(formRef.current) {
      try {
        const client = await api.get<IClient[]>(`/clients?noPagination=true&document=${document}`, {
          headers: { authorization: `Bearer ${storage.getItem('token')}` },
        });

        setHaveClient(client.data.length === 1);
        formRef.current.setFieldValue('name', client.data[0]?.name || '');
        formRef.current.setFieldValue('group', client.data[0]?.group || '');
      } catch(err) {
        if(err.message === 'Network Error' || !err.response) {
          toast.error('Verifique sua conexão com a internet.');
        } else {
          toast.error(err.response.data.message);
        }

        setHaveClient(false);
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
        toast.error('CPF/CNPJ inválido!');
        return;
      }

      formRef.current.setFieldValue('document', formatCPForCNPJ(document));

      if(!validCPForCNPJ(document)) {
        toast.error('CPF/CNPJ inválido!');
        return;
      }

      getClient(document);
    }
  };
  /* END DOCUMENT FORMAT HANDLER */

  /* - SAVE OR UPDATE VEHICLE - */
  const onSubmit: SubmitHandler<IFormData> = async (data, { reset }) => {
    setInLoading(true);

    try {
      if(vehicle) {
        onDocumentFocus();

        await api.put(`/vehicles/${vehicle.id}`, { ...data, document: data.document.replace(/\D/g, '') }, {
          headers: {
            authorization: `Bearer ${storage.getItem('token')}`,
          },
        });

        toast.success('Veículo atualizado com sucesso!');
      } else {
        await api.post('/vehicles', data, {
          headers: {
            authorization: `Bearer ${storage.getItem('token')}`,
          },
        });

        toast.success('Veículo atualizado com sucesso!');
      }

      onCloseHandler();
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }

    setInLoading(false);

    reset();
  };
  /* END SAVE OR UPDATE VEHICLE */

  /* - DELETE VEHICLE - */
  const onRemoveClick = async (id: string) => {
    setInLoading(true);

    try {
      await api.delete(`/vehicles/${id}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      toast.success('Veículo removido com sucesso!');

      onCloseHandler();
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }

    setInLoading(false);
  };
  /* END DELETE VEHICLE */

  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseHandler} header={`${vehicle ? 'ALTERACAO' : 'CADASTRO'} DE VEICULOS`}>
      <DetailsModalContainer initialData={initialData} ref={formRef} onSubmit={onSubmit}>
        <Input style={{ gridArea: 'CN' }} disabled={inLoading || haveClient} name="name" label="NOME" />
        <Input style={{ gridArea: 'CD' }} disabled={inLoading} name="document" label="DOCUMENTO" onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
        <Input style={{ gridArea: 'CG' }} disabled={inLoading || haveClient} name="group" label="GRUPO" />

        <hr style={{ gridArea: 'HR' }} />

        <Input style={{ gridArea: 'VP' }} disabled={inLoading} name="plate" label="PLACA" />
        <Input style={{ gridArea: 'VR' }} disabled={inLoading} name="renavam" label="RENAVAM" />
        <Input style={{ gridArea: 'VC' }} disabled={inLoading} name="crv" label="CRV" />
        <Input style={{ gridArea: 'VM' }} disabled={inLoading} name="brand_model" label="MARCA/MODELO" />
        <Input style={{ gridArea: 'VT' }} disabled={inLoading} name="type" label="TIPO" />
        <Select style={{ gridArea: 'VS' }} isDisabled={inLoading} name="status" label="STATUS" options={status} />
        <Input style={{ gridArea: 'VD' }} disabled={inLoading} name="details" label="DETALHES" />

        <div style={{ gridArea: 'HH', height: 10 }} />

        <div className="action-buttons" style={{ gridArea: 'AB' }}>
          <Button type="submit" variant="success" disabled={inLoading}>
            {vehicle ? 'SALVAR' : 'INCLUIR'}
          </Button>
          {vehicle && (
            <Button type="button" variant="error" disabled={inLoading} onClick={() => onRemoveClick(vehicle.id)}>
              EXCLUIR
            </Button>
          )}
        </div>
      </DetailsModalContainer>

      {inLoading && (
        <DetailsModalLoadingContainer>
          <ReactLoading type="bars" />
        </DetailsModalLoadingContainer>
      )}
    </Modal>
  );
};
