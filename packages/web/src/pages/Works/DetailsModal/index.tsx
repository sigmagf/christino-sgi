import { FormHandles } from '@unform/core';
import React, { useRef, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Input } from '~/components/Form';
import { Modal } from '~/components/Modal';
import { Table } from '~/components/Table';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { IClient, IWork } from '~/interfaces';
import { api } from '~/utils/api';
import { formatCPForCNPJ } from '~/utils/formatCPForCNPJ';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { DetailsForm } from './styles';

interface IDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  work?: IWork;
  workPermission: number;
}

export const WorkDetailsModal: React.FC<IDetailsModalProps> = ({ isOpen, onClose, work, workPermission }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  const services = useSWR('/services');

  const [inLoading] = useState(false);
  const [editing] = useState(true);
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

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} header="ORDEM DE SERVIÇO">
      <DetailsForm ref={formRef} onSubmit={console.log} initialData={work && { ...work.client, ...work, value: work.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}>
        <Input disabled={inLoading || !editing || haveClient} name="name" label="NOME" />
        <Input disabled={inLoading || !editing || clientSearched} name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
        <Input disabled={inLoading || !editing || haveClient} name="group" label="GRUPO" />

        <hr />

        <Input disabled name="sector.name" label="SETOR" />
        <Input disabled={inLoading || !editing} name="service.name" label="SERVIÇO" />
        <Input disabled={inLoading || !editing} name="identifier" label="IDENTIFICADOR" />
        <Input disabled={inLoading || !editing} name="value" label="VALOR" />
        <Input disabled={inLoading || !editing} name="status" label="STATUS" />
        <Table>
          <thead>
            <tr>
              <th style={{ height: 25 }}>TAXAS</th>
              <th style={{ width: 150, height: 25 }}>VALOR</th>
              <th style={{ width: 25, height: 25 }} aria-label="removeExpense" />
            </tr>
          </thead>
          <tbody>
            {work && work.expenses.map((el) => (
              <tr>
                <td style={{ height: 25 }}>{ el.expense_type.name }</td>
                <td style={{ height: 25 }}>{ el.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</td>
                <td style={{ height: 25 }}>
                  <Button variant="error" style={{ height: 9, width: 9 }} onClick={() => console.log('removeExpense()')} disabled={inLoading}>
                    <FaTimes />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th style={{ height: 25 }}>PAGAMENTOS</th>
              <th style={{ width: 150, height: 25 }}>VALOR</th>
              <th style={{ width: 25, height: 25 }} aria-label="removeRevenues" />
            </tr>
          </thead>
          <tbody>
            {work && work.revenues.map((el) => (
              <tr>
                <td style={{ height: 25 }}>{ el.payment_method.name }</td>
                <td style={{ height: 25 }}>{ el.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</td>
                <td style={{ height: 25 }}>
                  <Button variant="error" style={{ height: 9, width: 9 }} onClick={() => console.log('removeRevenues()')} disabled={inLoading}>
                    <FaTimes />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DetailsForm>
    </Modal>
  );
};
