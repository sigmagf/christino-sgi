import { FormHandles, SubmitHandler } from '@unform/core';
import { AxiosResponse } from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { Modal } from '~/components/Modal';
import { Table } from '~/components/Table';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { IClient, IService, IWork } from '~/interfaces';
import { api } from '~/utils/api';
import { worksStatus } from '~/utils/commonSelectOptions';
import { formatDate } from '~/utils/formatDate';
import { formatDocument } from '~/utils/formatDocument';
import { formatMoney } from '~/utils/formatMoney';
import { validCPForCNPJ } from '~/utils/validCPForCNPJ';

import { WorksDetailsModalForm, WorksDetailsActionButtons, WorksDetailsLoadingContainer } from './styles';

interface IFormData {
  name: string;
  document: string;
  group: string;

  service_id: string;
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
  onChangeSuccess: (work: IWork) => void;
}

export const WorksDetailsModal: React.FC<IWorksDetailsModalProps> = ({ isOpen, onClose, work, workPermission, onChangeSuccess }) => {
  const storage = useLocalStorage();
  const formRef = useRef<FormHandles>(null);

  const [inSubmitProcess, setInSubmitProcess] = useState(false);

  const [editing, setEditing] = useState(false);
  const [clientSearched, setClientSearched] = useState(false);
  const [haveClient, setHaveClient] = useState(true);

  const { data: services } = useSWR<IService[]>('/services?noPagination=true');

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

  /* - ON SERVICE CHANGE - */
  const onServiceChange = () => {
    if(formRef.current && services) {
      const sv = formRef.current.getFieldValue('service_id');
      formRef.current.setFieldValue('sector', services.filter((el) => el.id === sv)[0].sector.name);
    }
  };
  /* END ON SERVICE CHANGE */

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
        name: yup.string().required('Nome é obrigatório'),
        document: yup.string()
          .min(11, 'Documento deve ter pelo menos 11 caracteres (CPF).')
          .max(14, 'Documento deve ter no maximo 14 caracteres (CNPJ).')
          .test('validate-document', 'Documento inválido.', (el) => validCPForCNPJ(el || ''))
          .required('Documento é obrigatório.'),
        service_id: yup.string().required('O serviço é obrigatório.'),
        value: yup.string().required('O valor é obrigatório.'),
        status: yup.string().required('O status é obrigatório.'),
        history: yup.string().required('O historico é obrigatório.'),
      });

      const document = data.document.replace(/\D/g, '');
      await scheme.validate({ ...data, document }, { abortEarly: false });
      let response: AxiosResponse<IWork>;
      if(work) {
        response = await api.put<IWork>(`/works/${work.id}`, { ...data, document }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        response = await api.post<IWork>('/works', { ...data, document }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      setEditing(false);
      onChangeSuccess(response.data);
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

  const handleServiceOptions = () => {
    if(services) {
      return services.map((el) => ({ label: el.name, value: el.id }));
    }
    return [];
  };

  const onEditClick = () => {
    setEditing(true);
    setClientSearched(false);
    setHaveClient(true);
  };

  useEffect(() => {
    if(work) {
      setInSubmitProcess(false);

      setEditing(false);
      setClientSearched(false);
      setHaveClient(true);
    } else {
      setInSubmitProcess(false);

      setEditing(true);
      setClientSearched(false);
      setHaveClient(true);
    }
  }, [work]);

  return (
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
          ...work,
          ...work.client,
          document: formatDocument(work.client.document),
          service_id: services && services.filter((el) => el.id === work.service.id).map((el) => ({ label: el.name, value: el.id }))[0],
          client_id: work.client.id,
          status: worksStatus.filter((el) => el.value === work.status.toString())[0],
          sector: work.sector.name,
        }}
      >
        <Input disabled={!!work || !editing || haveClient} name="name" label="NOME" />
        <Input disabled={!!work || !editing || clientSearched} name="document" label="DOCUMENTO" maxLength={14} onFocus={onDocumentFocus} onBlur={onDocumentBlur} />
        <Input disabled={!!work || !editing || haveClient} name="group" label="GRUPO" />

        <hr />

        <Input disabled name="sector" label="SETOR" />
        <Select isDisabled={!!work || !editing} name="service_id" label="SERVIÇO" options={handleServiceOptions()} onChange={onServiceChange} />
        <Input disabled={!!work || !editing} name="identifier" label="IDENTIFICADOR" />
        <Input disabled={!!work || !editing} name="value" label="VALOR" onFocus={onValueFocus} onBlur={onValueBlur} />
        <Select isDisabled={!editing} name="status" label="STATUS" options={worksStatus} />
        <Input disabled={!!work || !editing} name="details" label="DETALHES" />
        <Input disabled={!editing} name="history" label="NOVA ENTRADA" />

        <Table>
          <thead>
            <tr>
              <th>HISTORICO</th>
              <th>CRIADO EM</th>
            </tr>
          </thead>
          <tbody>
            {work && work.histories.map((hist) => (
              <tr>
                <td>{ hist.details }</td>
                <td>{ formatDate(hist.created_at) }</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </WorksDetailsModalForm>
      <WorksDetailsActionButtons>
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
              <Button variant="warning" disabled={inSubmitProcess} onClick={onEditClick}>
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
  );
};
