import { FormHandles } from '@unform/core';
import React, { useRef, useState } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';

import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Select, Input } from '~/interface/Form';
import { IClient, IVehiclesFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { vehiclePlateEnd as plateEnd, vehicleStatus as status } from '~/utils/commonSelectOptions';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

import { FiltersCard, FiltersCardActionButtons, FiltersCardForm } from './styles';

interface IVehiclesFiltersCardProps {
  filters: Omit<IVehiclesFilters, 'page'|'limit'>;
  onFiltersApplyClick: (data: Omit<IVehiclesFilters, 'page'|'limit'>) => void;
  onCreateClick: () => void;
  despPermission: number;
}

export const VehiclesFiltersCard: React.FC<IVehiclesFiltersCardProps> = ({ filters, onCreateClick, onFiltersApplyClick, despPermission }) => {
  const storage = useLocalStorage();

  const formRef = useRef<FormHandles>(null);

  const { data: groups } = useSWR<string[]>('/clients/groups');

  let timer: any;

  const [clients, setClients] = useState([{ label: 'TODOS', value: '' }]);

  const includeTruckOptions = [
    {
      value: '0',
      label: 'SEM CAMINHOES',
    }, {
      value: '1',
      label: 'COM CAMINHOES',
    }, {
      value: '2',
      label: 'SÓ CAMINHOES',
    },
  ];

  const getClients = async (param: string) => {
    try {
      if(param.length === 11 || param.length === 14) {
        const response = await api.get<IClient>(`/clients/${param}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        const data = { value: response.data.id, label: `${response.data.document.padStart(14, '*')} - ${response.data.name}` };
        setClients([{ label: 'TODOS', value: '' }, data]);
      } else {
        const response = await api.get<IClient[]>(`/clients?noPagination=true&name=${param}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        const data = response.data.map((client) => ({ value: client.id, label: `${client.document.padStart(14, '*')} - ${client.name}` }));
        setClients([{ label: 'TODOS', value: '' }, ...data]);
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }
  };

  const onClientsInputChange = (name: string) => {
    if(!name) {
      return;
    }

    clearTimeout(timer);

    timer = setTimeout(() => { getClients(name); }, 1000);
  };

  const handleGroups = () => {
    if(groups) {
      const array = groups.map((g) => ({ value: g, label: g }));

      return [
        { label: 'TODOS', value: '' },
        { label: 'SEM GRUPO', value: '-1' },
        ...array,
      ];
    }

    return [
      { label: 'TODOS', value: '' },
      { label: 'SEM GRUPO', value: '-1' },
    ];
  };

  return (
    <FiltersCard>
      <FiltersCardForm ref={formRef} onSubmit={(data) => onFiltersApplyClick(data)} initialData={filters}>
        <Select label="CLIENTE" name="clientId" options={clients} onInputChange={onClientsInputChange} />
        <Select label="GRUPO" name="group" options={handleGroups()} />
        <Select label="STATUS" name="status" options={status} isMulti />

        <Input label="PLACA" name="plate" />
        <Input label="RENAVAM" name="renavam" />
        <Input label="CRV" name="crv" />
        <Input label="MARCA/MODELO" name="brandModel" />
        <Select label="FINAL DE PLACA" name="plateEnd" options={plateEnd} />
        <Select label="CAMINHOES" name="includeTruck" options={includeTruckOptions} />
      </FiltersCardForm>

      <FiltersCardActionButtons>
        {despPermission >= 2 && (
          <Button variant="success" style={{ width: 175.97 }} onClick={onCreateClick}>
            <FaPlus />&nbsp;&nbsp;&nbsp;ADICIONAR VEICULO
          </Button>
        )}

        <Button variant="secondary" style={{ width: 96.33 }} onClick={() => formRef.current && formRef.current.submitForm()}>
          <FaFilter />&nbsp;&nbsp;&nbsp;FILTRAR
        </Button>
      </FiltersCardActionButtons>
    </FiltersCard>
  );
};
