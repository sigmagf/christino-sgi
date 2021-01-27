import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState, useEffect } from 'react';
import { FaLayerGroup, FaPlus, FaFilter, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { NamedProps } from 'react-select';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Select, Input } from '~/components/Form';
import { useLocalStorage } from '~/hooks';
import { IClient, IVehiclesFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { vehiclePlateEnd, vehicleStatus } from '~/utils/commonSelectOptions';

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

  const getClients = async (name?: string) => {
    try {
      const response = await api.get<IClient[]>(`/clients?noPagination=true${name ? `&name=${name}` : ''}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      const data = response.data.map((client) => ({ value: client.id, label: `${client.document.padStart(14, '*')} - ${client.name}` }));
      setClients([{ label: 'TODOS', value: '' }, ...data]);
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  const onClientsInputChange = (newValue: string) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      getClients(newValue.toUpperCase());
    }, 1000);
  };

  const getGroups = async () => {
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
  };

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
            defaultValue={{ label: 'TODOS', value: '' }}
            onInputChange={onClientsInputChange}
          />
          <Select
            label="GRUPO"
            name="group"
            style={{ gridArea: 'CG' }}
            options={groups}
            defaultValue={{ value: '', label: 'TODOS' }}
          />
          <Select
            label="STATUS"
            name="status"
            style={{ gridArea: 'VS' }}
            options={vehicleStatus}
            defaultValue={[vehicleStatus[1], vehicleStatus[2], vehicleStatus[3]]}
            isMulti
          />

          <Input
            label="PLACA"
            name="plate"
            style={{ gridArea: 'VP' }}
          />
          <Input
            label="RENAVAM"
            name="renavam"
            style={{ gridArea: 'VR' }}
          />
          <Input
            label="CRV"
            name="crv"
            style={{ gridArea: 'VC' }}
          />
          <Input
            label="MARCA/MODELO"
            name="brand_model"
            style={{ gridArea: 'VM' }}
          />
          <Select
            label="FINAL DE PLACA"
            name="plate_end"
            style={{ gridArea: 'VF' }}
            options={vehiclePlateEnd}
            defaultValue={vehiclePlateEnd[0]}
          />
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
