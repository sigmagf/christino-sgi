import { FormHandles } from '@unform/core';
import React, { useRef, useState } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';

import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Select, Input } from '~/interface/Form';
import { IVehiclesFilters } from '~/interfaces';
import { vehiclePlateEnd as plateEnd, vehicleStatus as status } from '~/utils/commonSelectOptions';
import { handleGetClientsToSelect } from '~/utils/handleGetClientsToSelect';

import { FiltersCard, FiltersCardActionButtons, FiltersCardForm } from './styles';

interface IVehiclesFiltersCardProps {
  onFiltersApplyClick: (data: Omit<IVehiclesFilters, 'page'|'limit'>) => void;
  onCreateClick: () => void;
  despPermission: number;
}

export const VehiclesFiltersCard: React.FC<IVehiclesFiltersCardProps> = ({ onCreateClick, onFiltersApplyClick, despPermission }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const formRef = useRef<FormHandles>(null);
  let timer: NodeJS.Timeout;
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const { data: groups } = useSWR<string[]>('/clients/groups');
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  /* END BOOLEAN STATES */

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

  const onClientsInputChange = (name: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => { handleGetClientsToSelect(name, setClients); }, 1000);
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
      <FiltersCardForm ref={formRef} onSubmit={(data) => onFiltersApplyClick(data)}>
        <Select label="CLIENTE" name="clientId" options={clients} defaultValue={clients[0]} onInputChange={onClientsInputChange} />
        <Select label="GRUPO" name="group" options={handleGroups()} defaultValue={{ label: 'TODOS', value: '' }} />
        <Select label="STATUS" name="status" options={status} defaultValue={[status[1], status[2], status[3]]} isMulti />

        <Input label="PLACA" name="plate" />
        <Input label="RENAVAM" name="renavam" />
        <Input label="CRV" name="crv" />
        <Input label="MARCA/MODELO" name="brandModel" />
        <Select label="FINAL DE PLACA" name="plateEnd" options={plateEnd} defaultValue={plateEnd[0]} />
        <Select label="CAMINHOES" name="includeTruck" options={includeTruckOptions} defaultValue={includeTruckOptions[1]} />
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
