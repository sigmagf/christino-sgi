import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FaLayerGroup, FaPlus, FaFilter, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { NamedProps } from 'react-select';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Select, Input } from '~/components/Form';
import { useLocalStorage } from '~/hooks';
import { IClient, IVehiclesFilters } from '~/interfaces';
import { api } from '~/utils/api';

import { FiltersCard, FiltersCardActionButtons, FiltersContainer, FiltersHeaders } from './styles';

interface IVehiclesFiltersCardProps {
  onOpenImportModalClick: () => void;
  onOpenCreateModalClick: () => void;
  onFiltersApplyClick: (data: SubmitHandler<Omit<IVehiclesFilters, 'page'|'limit'>>) => void;
}

export const VehiclesFiltersCard: React.FC<IVehiclesFiltersCardProps> = ({ onOpenCreateModalClick, onOpenImportModalClick, onFiltersApplyClick }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  let timer: any;

  const [open, setOpen] = useState(true);
  const [groups, setGroups] = useState<NamedProps['options']>([]);
  const [clients, setClients] = useState<NamedProps['options']>([]);

  const plateEnd: NamedProps['options'] = [
    { value: '', label: 'TODOS' },
    { value: '0', label: 'FINAL 0' },
    { value: '1', label: 'FINAL 1' },
    { value: '2', label: 'FINAL 2' },
    { value: '3', label: 'FINAL 3' },
    { value: '4', label: 'FINAL 4' },
    { value: '5', label: 'FINAL 5' },
    { value: '6', label: 'FINAL 6' },
    { value: '7', label: 'FINAL 7' },
    { value: '8', label: 'FINAL 8' },
    { value: '9', label: 'FINAL 9' },
  ];

  const status: NamedProps['options'] = [
    { value: '0', label: 'BAIXADO' },
    { value: '1', label: 'CRLVe' },
    { value: '2', label: 'CRV' },
    { value: '3', label: 'OUTRO' },
  ];

  const getClients = useCallback(async (name?: string) => {
    try {
      const response = await api.get<IClient[]>(`/clients?noPagination=true${name ? `&name=${name}` : ''}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      const data = response.data.map((client) => ({ value: client.id, label: client.name }));
      setClients(data);
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }
  }, [storage]);

  const loadClients = (newValue: string) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      getClients(newValue.toUpperCase());
    }, 1000);
  };

  const getGroups = useCallback(async () => {
    try {
      const response = await api.get<string[]>('/clients/groups', {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      const data = response.data.map((group) => ({ value: group, label: group }));
      setGroups(data);
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }
  }, [storage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getGroups(); }, []);

  return (
    <FiltersCard>
      <FiltersContainer open={open}>
        <Form ref={formRef} onSubmit={onFiltersApplyClick}>
          <Select
            label="CLIENTE"
            name="client_id"
            style={{ gridArea: 'CN' }}
            options={clients}
            openMenuOnFocus={false}
            openMenuOnClick={false}
            onInputChange={loadClients}
          />
          <Select label="GRUPO" name="group" style={{ gridArea: 'CG' }} options={groups} />
          <Select label="STATUS" name="status" style={{ gridArea: 'VS' }} options={status} defaultValue={[status[1], status[2], status[3]]} isMulti />

          <Input label="PLACA" name="plate" style={{ gridArea: 'VP' }} />
          <Input label="RENAVAM" name="renavam" style={{ gridArea: 'VR' }} />
          <Input label="CRV" name="crv" style={{ gridArea: 'VC' }} />
          <Input label="MARCA/MODELO" name="brand_model" style={{ gridArea: 'VM' }} />
          <Select label="FINAL DE PLACA" name="plate_end" style={{ gridArea: 'VF' }} options={plateEnd} />
        </Form>

        <FiltersHeaders onClick={() => setOpen((old) => !old)}>
          {open ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
          &nbsp;&nbsp;
          Filtros
          &nbsp;&nbsp;
          {open ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
        </FiltersHeaders>
      </FiltersContainer>

      <FiltersCardActionButtons>
        <Button variant="success" style={{ width: 175.97 }} onClick={onOpenCreateModalClick}>
          <FaPlus />&nbsp;&nbsp;&nbsp;ADICIONAR VEICULO
        </Button>
        <Button variant="info" style={{ width: 217.19 }} onClick={onOpenImportModalClick}>
          <FaLayerGroup />&nbsp;&nbsp;&nbsp;ENVIAR LOTE DE VEICULOS
        </Button>
        {open && (
        <Button variant="secondary" style={{ width: 96.33 }} onClick={() => formRef.current && formRef.current.submitForm()}>
          <FaFilter />&nbsp;&nbsp;&nbsp;FILTRAR
        </Button>
        )}
      </FiltersCardActionButtons>
    </FiltersCard>
  );
};
