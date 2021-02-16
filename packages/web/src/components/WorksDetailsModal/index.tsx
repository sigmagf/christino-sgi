import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Input, Select, TextArea } from '~/interface/Form';
import { Modal } from '~/interface/Modal';
import { Table } from '~/interface/Table';
import { IClient, IService, IWork } from '~/interfaces';
import { api } from '~/utils/api';
import { worksStatus } from '~/utils/commonSelectOptions';
import { formatDate } from '~/utils/formatDate';
import { formatDocument } from '~/utils/formatDocument';
import { formatMoney } from '~/utils/formatMoney';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { ClientsDetailsModal } from '../ClientsDetailsModal';
import { WorksDetailsModalForm, WorksDetailsActionButtons, WorksDetailsLoadingContainer } from './styles';

interface IFormData {
  clientId: string;
  serviceId: string;
  identifier: string;
  value: string;
  status: string;
  details: string;
  history: string;
}

interface IWorksDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  work?: IWork;
  workPermission: number;
}

export const WorksDetailsModal: React.FC<IWorksDetailsModalProps> = ({ isOpen, onClose, work, workPermission }) => {
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);

  const [cadClientModal, setCadClientModal] = useState(false);
  const [inSubmitProcess, setInSubmitProcess] = useState(false);

  const [editing, setEditing] = useState(false);

  const { data: services } = useSWR<IService[]>('/services?noPagination=true');

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

  /* - HANDLE VALUE FORMAT - */
  const onValueFocus = () => {
    if(formRef.current) {
      const value = formRef.current.getFieldValue('value').replace('.', '');
      formRef.current.setFieldValue('value', value);
    }
  };

  const onValueBlur = () => {
    if(formRef.current) {
      const value = formRef.current.getFieldValue('value').replace(',', '.');
      formRef.current.setFieldValue('value', formatMoney(value));
    }
  };
  /* END HANDLE VALUE FORMAT */

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

      if(document.length !== 11 && document.length !== 14) {
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
        clientId: yup.string().required('Erro ao vincular o cliente.'),
        serviceId: yup.string().required('O serviço é obrigatório.'),
        value: yup.string().required('O valor é obrigatório.'),
        status: yup.string().required('O status é obrigatório.'),
        history: yup.string().required('O historico é obrigatório.'),
      });

      const history = `${worksStatus.filter((el) => el.value === data.status)[0].label} - ${data.history}`;
      const value = data.value.replace('.', '').replace(',', '.').trim();
      await scheme.validate({ ...data, value, history }, { abortEarly: false });

      if(work) {
        await api.put<IWork>(`/works/${work.id}`, { ...data, value, history }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        await api.post<IWork>('/works', { ...data, value, history }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      setEditing(false);
      onClose();
      toast.success(`Ordem de serviço ${work ? 'atualizada' : 'criada'} com sucesso!`);
    } catch(err) {
      console.log(data);
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

  const handleServiceOptions = () => {
    if(services) {
      const groups: {label: string; options: { label: string; value: string}[]}[] = [];

      services.forEach((option) => {
        if(!groups.find((gp) => gp.label === option.sector.name)) {
          groups.push({ label: option.sector.name, options: [] });
        }

        const i = groups.findIndex((gp) => gp.label === option.sector.name);
        groups[i].options.push({ label: option.name, value: option.id });
      });

      groups.forEach((group) => ({
        label: group.label,
        options: group.options.sort((a, b) => {
          if(a.label < b.label) return -1;
          if(a.label > b.label) return 1;
          return 0;
        }),
      }));

      return groups;
    }

    return [];
  };

  useEffect(() => {
    if(work) {
      setEditing(false);
      setInSubmitProcess(false);

      setEditing(false);
    } else {
      setEditing(true);
      setInSubmitProcess(false);

      setEditing(true);
    }
  }, [work]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        haveHeader
        header={`${work ? 'ALTERAR' : 'CRIAR'} ORDEM DE SERVIÇO`}
      >
        <WorksDetailsModalForm
          ref={formRef}
          onSubmit={onSubmit}
          initialData={work && {
            ...work.client,
            ...work,
            document: formatDocument(work.client.document),
            value: formatMoney(work.value),
            serviceId: services && services.filter((el) => el.id === work.serviceId).map((el) => ({ label: el.name, value: el.id }))[0],
            status: worksStatus.find((el) => el.value === work.status.toString()),
          }}
        >
          <div className="hidden-input">
            <Input type="hidden" name="clientId" />
          </div>
          <Input disabled name="name" label="NOME" />
          <Input disabled={!!work || !editing} name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
          <Input disabled name="group" label="GRUPO" />

          <hr />

          <Select isDisabled={!!work || !editing} name="serviceId" label="SERVIÇO" options={handleServiceOptions()} />
          <Input disabled={!!work || !editing} name="identifier" label="IDENTIFICADOR" />
          <Input disabled={!editing} name="value" label="VALOR" onFocus={onValueFocus} onBlur={onValueBlur} />
          <Select isDisabled={!editing} name="status" label="STATUS" options={worksStatus} />
          <TextArea disabled={!editing} name="details" label="DETALHES" rows={3} />
          { editing && <Input name="history" label="NOVA ENTRADA" /> }

          <Table>
            <thead>
              <tr>
                <th>HISTORICO</th>
                <th>CRIADO EM</th>
              </tr>
            </thead>
            <tbody>
              {work && work.histories.map((hist) => (
                <tr key={hist.id}>
                  <td>{ hist.details }</td>
                  <td>{ formatDate(hist.createdAt) }</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </WorksDetailsModalForm>
        <WorksDetailsActionButtons editing={editing}>
          {workPermission >= 2 && (
            <>
              {editing ? (
                <>
                  <Button type="submit" variant="success" disabled={inSubmitProcess} onClick={() => formRef.current && formRef.current.submitForm()}>
                    SALVAR
                  </Button>
                  {work && (
                    <Button variant="warning" disabled={inSubmitProcess} onClick={() => setEditing(false)}>
                      CANCELAR
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="warning" disabled={inSubmitProcess} onClick={() => setEditing(true)}>
                  EDITAR
                </Button>
              )}
            </>
          )}
        </WorksDetailsActionButtons>

        {inSubmitProcess && (
          <WorksDetailsLoadingContainer>
            <ReactLoading type="bars" />
          </WorksDetailsLoadingContainer>
        )}
      </Modal>

      <ClientsDetailsModal
        cliePermission={2}
        isOpen={cadClientModal}
        onClose={() => setCadClientModal(false)}
        onChangeSuccess={onDocumentBlur}
      />
    </>
  );
};
