import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Input, Select, TextArea } from '~/interface/Form';
import { Modal } from '~/interface/Modal';
import { Table } from '~/interface/Table';
import { IService, IWork } from '~/interfaces';
import { api } from '~/utils/api';
import { worksStatus } from '~/utils/commonSelectOptions';
import { formatMoney, formatDate } from '~/utils/formatString';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { onValueInputBlur, onValueInputFocus } from '~/utils/handleInputFormat';

import { ClientsDetailsModal } from '../ClientsDetailsModal';
import { ClientSearchInput } from '../ClientSearchInput';
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
  cliePermission: number;
}

export const WorksDetailsModal: React.FC<IWorksDetailsModalProps> = ({ isOpen, onClose, work, workPermission, cliePermission }) => {
  const storage = useLocalStorage();

  const formRef = useRef<FormHandles>(null);

  const [cadClientModal, setCadClientModal] = useState(false);
  const [inSubmitProcess, setInSubmitProcess] = useState(false);

  const [editing, setEditing] = useState(false);

  const { data: services } = useSWR<IService[]>('/services?noPagination=true');

  /* - SAVE OR UPDATE VEHICLE - */
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setInSubmitProcess(true);

    try {
      const scheme = yup.object().shape({
        clientId: yup.string().required('Erro ao vincular o cliente.'),
        serviceId: yup.string().required('O serviço é obrigatório.'),
        value: yup.string().required('O valor é obrigatório.'),
        status: yup.string().required('O status é obrigatório.'),
        details: yup.string().max(256, 'Os detalhes devem ter no máximo 256 caracteres'),
        identifier: yup.string().max(16, 'O identificador devem ter no máximo 16 caracteres').required('O identificador é obrigatório.'),
        history: yup.string().max(115, 'O histórico devem ter no máximo 115 caracteres').required('O historico é obrigatório.'),
      });

      const history = `${worksStatus.filter((el) => el.value === data.status)[0].label} - ${data.history}`;
      const value = data.value.replace('.', '').replace(',', '.').trim();
      await scheme.validate({ ...data, value }, { abortEarly: false });

      if(work) {
        await api.put<IWork>(`/works/${work.id}`, { ...data, value, history }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      } else {
        await api.post<IWork>('/works', { ...data, value, history }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });
      }

      setEditing(false);
      onClose();
      toast.success(`Ordem de serviço ${work ? 'atualizada' : 'criada'} com sucesso!`);
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
      <Modal isOpen={isOpen} onRequestClose={onClose} haveHeader header={`${work ? 'ALTERAR' : 'CRIAR'} ORDEM DE SERVIÇO`}>
        <WorksDetailsModalForm
          ref={formRef}
          onSubmit={onSubmit}
          initialData={work && {
            ...work,
            value: formatMoney(work.value),
            serviceId: services && services.filter((el) => el.id === work.serviceId).map((el) => ({ label: el.name, value: el.id }))[0],
            status: worksStatus.find((el) => el.value === work.status.toString()),
          }}
        >
          <ClientSearchInput
            disabled={!!work || !editing}
            defaultValue={work && { value: work.clientId, label: `${work.client.document.padStart(14, '*')} - ${work.client.name}` }}
          />
          <Button
            type="button"
            variant="info"
            disabled={!!work || !editing}
            style={{ maxHeight: 40, marginTop: 20 }}
            onClick={() => setCadClientModal(true)}
          >
            <FaPlus />
          </Button>

          <hr />

          <Select isDisabled={!!work || !editing} name="serviceId" label="SERVIÇO" options={handleServiceOptions()} />
          <Input disabled={!editing} name="identifier" label="IDENTIFICADOR" />
          <Input disabled={!editing} name="value" label="VALOR" onFocus={() => onValueInputFocus(formRef)} onBlur={() => onValueInputBlur(formRef)} />
          <Select isDisabled={!editing} name="status" label="STATUS" options={worksStatus} />
          <TextArea disabled={!editing} name="details" label="DETALHES" rows={3} maxLength={256} />
          { editing && <Input name="history" label="NOVA ENTRADA DO HISTÓRICO" maxLength={115} /> }

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
        isOpen={cadClientModal}
        onClose={() => setCadClientModal(false)}
        cliePermission={cliePermission}
      />
    </>
  );
};
