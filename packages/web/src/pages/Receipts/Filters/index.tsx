import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';

import { Button } from '~/components/Button';
import { Input } from '~/components/Form';
import { IReceipt } from '~/interfaces';

import { FiltersContainer } from './styles';

interface IReceiptsFilter {
  onFilterSubmit: (data: Pick<IReceipt, 'client'|'vehicle'>) => void;
}

export const ReceiptsFilters: React.FC<IReceiptsFilter> = ({ onFilterSubmit }) => {
  const formRef = useRef<FormHandles>(null);

  const onSubmit: SubmitHandler<Pick<IReceipt, 'client'|'vehicle'>> = (data) => {
    onFilterSubmit(data);
  };

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
        </Scope>

        <Button style={{ gridArea: 'BT' }} type="submit" apparence="success">
          FILTRAR
        </Button>
      </FiltersContainer>
    </Form>
  );
};
