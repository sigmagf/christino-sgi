import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';

import { Button } from '~/components/Button';
import { Input, Select } from '~/components/Form';
import { ICRVFilter } from '~/interfaces';

import { FiltersContainer } from './styles';

interface ICRVsFilter {
  onFilterSubmit: (data: ICRVFilter) => void;
}

export const CRVsFilters: React.FC<ICRVsFilter> = ({ onFilterSubmit }) => {
  const formRef = useRef<FormHandles>(null);

  const onSubmit: SubmitHandler<ICRVFilter> = (data) => {
    onFilterSubmit(data);
  };

  const groupOptions = [
    { value: '', label: 'TODOS' },
    { value: '-1', label: 'SEM GRUPO' },
    { value: 'ABA', label: 'ABA' },
    { value: 'AOYAMA', label: 'AOYAMA' },
    { value: 'AUTO PECAS', label: 'AUTO PECAS' },
    { value: 'CGM', label: 'CGM' },
    { value: 'CLAUDIO', label: 'CLAUDIO' },
    { value: 'E J RIBEIRO', label: 'E J RIBEIRO' },
    { value: 'EDMUNDO NETO', label: 'EDMUNDO NETO' },
    { value: 'EDMUR', label: 'EDMUR' },
    { value: 'ELIANO ANTUNES', label: 'ELIANO ANTUNES' },
    { value: 'ELIAS ANTUNES', label: 'ELIAS ANTUNES' },
    { value: 'ELVIS AIELO', label: 'ELVIS AIELO' },
    { value: 'ESCRITORIO', label: 'ESCRITORIO' },
    { value: 'F. DOMINGUES', label: 'F. DOMINGUES' },
    { value: 'GIANSANTE LEITAO', label: 'GIANSANTE LEITAO' },
    { value: 'GRANJA ANTUNES', label: 'GRANJA ANTUNES' },
    { value: 'JACOB', label: 'JACOB' },
    { value: 'KAITO', label: 'KAITO' },
    { value: 'M DE CAMPOS', label: 'M DE CAMPOS' },
    { value: 'PAULO GARCIA', label: 'PAULO GARCIA' },
    { value: 'PERNINHA', label: 'PERNINHA' },
    { value: 'PIO', label: 'PIO' },
    { value: 'PREFEITURA', label: 'PREFEITURA' },
    { value: 'RM DOCES', label: 'RM DOCES' },
    { value: 'VALTER RODRIGUES', label: 'VALTER RODRIGUES' },
    { value: 'VANIL RODRIGUES', label: 'VANIL RODRIGUES' },
    { value: 'ZE DITO', label: 'ZE DITO' },
  ];

  const licensingMonthOptions = [
    { value: '', label: 'TODOS' },
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
          <Select style={{ gridArea: 'CG' }} options={groupOptions} defaultValue={{value='', label='TODOS'}} name="group" label="GRUPO" />
        </Scope>
        <Scope path="vehicle">
          <Input style={{ gridArea: 'VP' }} name="plate" label="PLACA" />
          <Input style={{ gridArea: 'VR' }} name="renavam" label="RENAVAM" />
          <Input style={{ gridArea: 'VB' }} name="brandModel" label="MARCA/MODELO" />
          <Select style={{ gridArea: 'VV' }} options={licensingMonthOptions} defaultValue={{ value: '', label: 'TODOS' }} name="licensingMonth" label="VENCIMENTO" />
        </Scope>

        <Button style={{ gridArea: 'BT' }} type="submit" apparence="success">
          FILTRAR
        </Button>
      </FiltersContainer>
    </Form>
  );
};
