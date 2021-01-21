import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import {
  FaLayerGroup as StackIcon,
  FaPlus as AddIcon,
  FaFilter as FilterIcon,
  FaAngleDown as ArrowDownIcon,
  FaAngleUp as ArrowUpIcon,
} from 'react-icons/fa';
import { NamedProps } from 'react-select';

import { Button } from '~/components/Button';
import { Select, Input } from '~/components/Form';

import { FiltersCard, FiltersCardActionButtons, FiltersContainer, FiltersHeaders } from './styles';

interface IVehiclesFiltersCardProps {
  clients: NamedProps['options'];
  onOpenImportModalClick: () => void;
  onOpenCreateModalClick: () => void;
}

const VehiclesFiltersCard: React.FC<IVehiclesFiltersCardProps> = ({ clients, onOpenCreateModalClick, onOpenImportModalClick }) => {
  const formRef = useRef<FormHandles>(null);

  const [open, setOpen] = useState(true);

  return (
    <FiltersCard>
      <FiltersContainer open={open}>
        <Form ref={formRef} onSubmit={(data) => console.log(data)}>
          <Select label="CLIENTE" name="client_id" style={{ gridArea: 'CN' }} options={clients} />
          <Input label="GRUPO" name="client.group" style={{ gridArea: 'CG' }} />

          <Input label="PLACA" name="plate" style={{ gridArea: 'VP' }} />
          <Input label="RENAVAM" name="renavam" style={{ gridArea: 'VR' }} />
          <Input label="CRV" name="crv" style={{ gridArea: 'VC' }} />
          <Input label="MARCA/MODELO" name="renavam" style={{ gridArea: 'VM' }} />
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
