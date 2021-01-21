import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  FaLayerGroup as StackIcon,
  FaPlus as AddIcon,
  FaFilter as FilterIcon,
  FaAngleDown as ArrowDownIcon,
  FaAngleUp as ArrowUpIcon,
} from 'react-icons/fa';
import { NamedProps } from 'react-select';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Select, Input } from '~/components/Form';
import { useLocalStorage } from '~/hooks';
import { IClient } from '~/interfaces';
import { api } from '~/utils/api';

import { FiltersCard, FiltersCardActionButtons, FiltersContainer, FiltersHeaders } from './styles';

interface IVehiclesFiltersCardProps {
  onOpenImportModalClick: () => void;
  onOpenCreateModalClick: () => void;
}

const VehiclesFiltersCard: React.FC<IVehiclesFiltersCardProps> = ({ onOpenCreateModalClick, onOpenImportModalClick }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  const [open, setOpen] = useState(true);
  const [clients, setClient] = useState<NamedProps['options']>([]);
  const [groups, setGroups] = useState<NamedProps['options']>([
    {
      value: '',
      label: 'TODOS',
    },
    {
      value: '-1',
      label: 'SEM GRUPO',
    },
  ]);

  const plateEnd: NamedProps['options'] = [
    { value: '-1', label: 'TODOS' },
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

  const getClients = useCallback(async () => {
    try {
      const response = await api.get<IClient[]>('/clients?noPagination=true', {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      setClient([
        {
          value: '',
          label: '',
        },
        ...response.data.map((client) => ({
          value: client.id,
          label: client.name,
        })),
      ]);
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }
  }, [storage]);

  // eslint-disable-next-line
  useEffect(() => { getClients(); }, []);

  return (
    <FiltersCard>
      <FiltersContainer open={open}>
        <Form ref={formRef} onSubmit={(data) => console.log(data)}>
          <Select label="CLIENTE" name="client_id" style={{ gridArea: 'CN' }} options={clients} />
          <Select label="GRUPO" name="client.group" style={{ gridArea: 'CG' }} options={groups} />

          <Input label="PLACA" name="plate" style={{ gridArea: 'VP' }} />
          <Input label="RENAVAM" name="renavam" style={{ gridArea: 'VR' }} />
          <Input label="CRV" name="crv" style={{ gridArea: 'VC' }} />
          <Input label="MARCA/MODELO" name="renavam" style={{ gridArea: 'VM' }} />
          <Select label="FINAL DE PLACA" name="plante_end" style={{ gridArea: 'VF' }} options={plateEnd} />
        </Form>

        <FiltersHeaders onClick={() => setOpen((old) => !old)}>
          {open ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />}
          &nbsp;&nbsp;
          Filtros
          &nbsp;&nbsp;
          {open ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />}
        </FiltersHeaders>
      </FiltersContainer>

      <FiltersCardActionButtons>
        <Button variant="success" style={{ width: 175.97 }} onClick={onOpenCreateModalClick}>
          <AddIcon />&nbsp;&nbsp;&nbsp;ADICIONAR VEICULO
        </Button>
        <Button variant="info" style={{ width: 217.19 }} onClick={onOpenImportModalClick}>
          <StackIcon />&nbsp;&nbsp;&nbsp;ENVIAR LOTE DE VEICULOS
        </Button>
        {open && (
        <Button variant="secondary" style={{ width: 96.33 }} onClick={() => formRef.current && formRef.current.submitForm()}>
          <FilterIcon />&nbsp;&nbsp;&nbsp;FILTRAR
        </Button>
        )}
      </FiltersCardActionButtons>
    </FiltersCard>
  );
};

export default VehiclesFiltersCard;
