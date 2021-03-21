import { FormHandles } from '@unform/core';
import React, { useRef, useContext } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';

import { ClientsSearchInput } from '~/components/Clients/SearchInput';
import { Button } from '~/components/UI/Button';
import { Select, Input } from '~/components/UI/Form';
import { UserPermissionsContext } from '~/contexts/UserPermissions';
import { useSWR } from '~/hooks';
import { IVehiclesRequestFilters } from '~/interfaces';
import { vehiclePlateEnd as plateEnd, vehicleStatus as status } from '~/utils/commonSelectOptions';

import { FiltersCardContainer, FiltersCardActionButtons, FiltersCardForm } from './styles';

interface IFiltersCardProps {
  onFiltersApplyClick: (data: Omit<IVehiclesRequestFilters, 'page'|'limit'>) => void;
  onCreateClick: () => void;
}

export const VehiclesFiltersCard: React.FC<IFiltersCardProps> = ({ onCreateClick, onFiltersApplyClick }) => {
  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const formRef = useRef<FormHandles>(null);
  const { despPermission } = useContext(UserPermissionsContext);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const { data: groups } = useSWR<string[]>('/clients/groups');
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  /* END BOOLEAN STATES */

  const includeTruckOptions = [{
    value: '0',
    label: 'SEM CAMINHOES',
  }, {
    value: '1',
    label: 'COM CAMINHOES',
  }, {
    value: '2',
    label: 'SÓ CAMINHOES',
  }];

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
    <FiltersCardContainer>
      <FiltersCardForm ref={formRef} onSubmit={(data) => onFiltersApplyClick(data)}>
        <ClientsSearchInput defaultValue={{ value: '', label: 'TODOS' }} includeAll />
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
          <Button variant="success" onClick={onCreateClick}>
            <FaPlus />&nbsp;&nbsp;&nbsp;ADICIONAR VEICULO
          </Button>
        )}

        <Button variant="secondary" onClick={() => formRef.current && formRef.current.submitForm()}>
          <FaFilter />&nbsp;&nbsp;&nbsp;FILTRAR
        </Button>
      </FiltersCardActionButtons>
    </FiltersCardContainer>
  );
};
