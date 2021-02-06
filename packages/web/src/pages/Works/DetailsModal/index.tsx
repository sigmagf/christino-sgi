import { FormHandles } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { Modal } from '~/components/Modal';
import { Table } from '~/components/Table';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { IClient, IService, IWork } from '~/interfaces';
import { api } from '~/utils/api';
import { worksStatus } from '~/utils/commonSelectOptions';
import { formatCPForCNPJ } from '~/utils/formatCPForCNPJ';
import { formatDate } from '~/utils/formatDate';
import { formatMoney } from '~/utils/formatMoney';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { ActionButtons, DetailsForm } from './styles';

interface IDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  work?: IWork;
  workPermission: number;
}

export const WorkDetailsModal: React.FC<IDetailsModalProps> = ({ isOpen, onClose, work }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  const { data: services } = useSWR<IService[]>('/services');

  const [inLoading, setInLoading] = useState(false);
  const [editing, setEditing] = useState(true);
  const [haveClient, setHaveClient] = useState(true);
  const [clientSearched, setClientSearched] = useState(false);

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

  const handleChangeSector = () => {
    if(formRef && services) {
      const srv = formRef.current?.getFieldValue('service');
      formRef.current?.setFieldValue('sector.name', services.filter((sv) => sv.id === srv)[0].sector.name);
    }
  };

  const handleServices = (srvs: IService[]) => {
    return srvs.map((serv) => ({
      label: serv.name,
      value: serv.id,
    }));
  };

  const onValueBlur = () => {
    if(formRef.current) {
      const value: number = parseFloat(formRef.current.getFieldValue('value').replace(',', '.'));
      formRef.current.setFieldValue('value', formatMoney(value));
    }
  };

  const onValueFocus = () => {
    if(formRef.current) {
      const value: string = formRef.current.getFieldValue('value');
      formRef.current.setFieldValue('value', value.replace('.', '').trim());
    }
  };

  useEffect(() => {
    if(work) {
      setInLoading(false);

      setEditing(true);
      setClientSearched(false);
      setHaveClient(true);
    } else {
      setInLoading(false);

      setEditing(true);
      setClientSearched(false);
      setHaveClient(true);
    }
  }, [isOpen, work]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} header="ORDEM DE SERVIÇO">
      <DetailsForm
        ref={formRef}
        onSubmit={console.log}
        initialData={work && {
          ...work.client,
          ...work,
          document: formatCPForCNPJ(work.client.document),
          value: work.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim(),
          status: worksStatus[work.status],
          service: handleServices(services || []).filter((s) => s.value === work.service.id)[0],
        }}
      >
        <Input disabled={inLoading || !editing || haveClient} name="name" label="NOME" />
        <Input disabled={inLoading || !editing || clientSearched} name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
        <Input disabled={inLoading || !editing || haveClient} name="group" label="GRUPO" />

        <hr />

        <Input disabled name="sector.name" label="SETOR" />
        <Select isDisabled={inLoading || !editing} name="service" label="SERVIÇO" options={handleServices(services || [])} onChange={handleChangeSector} />
        <Input disabled={inLoading || !editing} name="identifier" label="IDENTIFICADOR" />
        <Input disabled={inLoading || !editing} name="value" label="VALOR" onBlur={onValueBlur} onFocus={onValueFocus} />
        <Select isDisabled={inLoading || !editing} name="status" label="STATUS" options={worksStatus} />
        <Input disabled={inLoading || !editing} name="details" label="DETALHES" />

        <Table>
          <thead>
            <tr>
              <th style={{ height: 25 }}>DESCRICAO</th>
              <th style={{ height: 25, width: 75 }}>DATA</th>
            </tr>
          </thead>
          <tbody>
            {work && work.history.map((el) => (
              <tr key={el.id}>
                <td style={{ height: 25 }}>{ el.details }</td>
                <td style={{ height: 25, textAlign: 'center' }}>{ formatDate(el.created_at) }</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ActionButtons>
          <Button variant="info">
            NOVA ENTRADA
          </Button>
        </ActionButtons>
      </DetailsForm>
    </Modal>
  );
};
