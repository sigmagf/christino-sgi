import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { ICRV } from '~/interfaces';

import { FiltersContainer } from './styles';

interface ICRVsFilter {
  onFilterSubmit: (data: Pick<ICRV, 'client'|'vehicle'>) => void;
}

export const CRVsFilters: React.FC<ICRVsFilter> = ({ onFilterSubmit }) => {
  const formRef = useRef<FormHandles>(null);

  const onSubmit: SubmitHandler<Pick<ICRV, 'client'|'vehicle'>> = (data) => {
    console.log(data);
    onFilterSubmit(data);
  };

  const options = [
    { value: '4', label: '4 - ABRIL' },
    { value: '5', label: '5 - MAIO' },
    { value: '6', label: '6 - JUNHO' },
    { value: '7', label: '7 - JULHO' },
    { value: '8', label: '8 - AGOSTO' },
    { value: '9', label: '9 - SETEMBRO' },
    { value: '10', label: '10 - OUTUBRO' },
    { value: '11', label: '11 - NOVEMBRO' },
    { value: '12', label: '12 - DEZEMBRO' },
  ];

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <FiltersContainer>
        <Scope path="client">
          <Input style={{ gridArea: 'CN' }} name="name" label="NOME" />
          <Input style={{ gridArea: 'CG' }} name="group" label="GRUPO" />
        </Scope>
        <Scope path="vehicle">
          <Input style={{ gridArea: 'VP' }} name="plate" label="PLACA" />
          <Input style={{ gridArea: 'VR' }} name="renavam" label="RENAVAM" />
          <Input style={{ gridArea: 'VB' }} name="brandModel" label="MARCA/MODELO" />
          <Select style={{ gridArea: 'VV' }} options={options} name="licensingMonth" label="VENCIMENTO" />
        </Scope>

        <Button style={{ gridArea: 'BT' }} type="submit" apparence="success">
          FILTRAR
        </Button>
      </FiltersContainer>
    </Form>
  );
};
