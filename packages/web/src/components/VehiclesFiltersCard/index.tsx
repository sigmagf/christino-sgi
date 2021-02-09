import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import { FaLayerGroup, FaPlus, FaFilter, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';

import { Button } from '~/interface/Button';
import { Select, Input } from '~/interface/Form';
import { IClient, IVehiclesFilters } from '~/interfaces';

import { api } from '~/utils/api';
import { vehiclePlateEnd as plateEnd, vehicleStatus as status } from '~/utils/commonSelectOptions';

import { FiltersCard, FiltersCardActionButtons, FiltersContainer, FiltersHeaders } from './styles';

interface IVehiclesFiltersCardProps {
  onOpenImportModalClick: () => void;
  onFiltersApplyClick: (data: Omit<IVehiclesFilters, 'page'|'limit'>) => void;
  onCreateClick: () => void;
  despPermission: number;
}

export const VehiclesFiltersCard: React.FC<IVehiclesFiltersCardProps> = ({ onOpenImportModalClick, onCreateClick, onFiltersApplyClick, despPermission }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  const { data: groups } = useSWR<string[]>('/clients/groups?pagination=false');

  let timer: any;

  const [open, setOpen] = useState(true);
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

  const getClients = async (name: string) => {
    try {
      const response = await api.get<IClient[]>(`/clients?noPagination=true${name ? `&name=${name}` : ''}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
      });

      const data = response.data.map((client) => ({ value: client.id, label: `${client.document.padStart(14, '*')} - ${client.name}` }));
      setClients([{ label: 'TODOS', value: '' }, ...data]);
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }
  };

  const onClientsInputChange = (name: string) => {
    if(!name) {
      return;
    }

    clearTimeout(timer);

    timer = setTimeout(() => { getClients(name); }, 1000);
  };

  const handleGroups = (gr: string[]) => {
    const array = gr.map((g) => ({ value: g, label: g }));

    return [
      { label: 'TODOS', value: '' },
      ...array,
    ];
  };

  return (
    <FiltersCard>
      <FiltersContainer open={open}>
        <Form ref={formRef} onSubmit={(data) => onFiltersApplyClick(data)}>
          <Select label="CLIENTE" name="client_id" options={clients} defaultValue={clients[0]} onInputChange={onClientsInputChange} />
          <Select label="GRUPO" name="group" options={handleGroups(groups || [])} defaultValue={{ label: 'TODOS', value: '' }} />
          <Select label="STATUS" name="status" options={status} defaultValue={[status[1], status[2], status[3]]} isMulti />

          <Input label="PLACA" name="plate" />
          <Input label="RENAVAM" name="renavam" />
          <Input label="CRV" name="crv" />
          <Input label="MARCA/MODELO" name="brand_model" />
          <Select label="FINAL DE PLACA" name="plate_end" options={plateEnd} defaultValue={plateEnd[0]} />
          <Select label="CAMINHOES" name="include_truck" options={includeTruckOptions} defaultValue={includeTruckOptions[1]} />
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
        {despPermission >= 2 && (
          <>
            <Button variant="success" style={{ width: 175.97 }} onClick={onCreateClick}>
              <FaPlus />&nbsp;&nbsp;&nbsp;ADICIONAR VEICULO
            </Button>
            <Button variant="info" style={{ width: 217.19 }} onClick={onOpenImportModalClick}>
              <FaLayerGroup />&nbsp;&nbsp;&nbsp;ENVIAR LOTE DE VEICULOS
            </Button>
          </>
        )}
        {open && (
          <Button variant="secondary" style={{ width: 96.33 }} onClick={() => formRef.current && formRef.current.submitForm()}>
            <FaFilter />&nbsp;&nbsp;&nbsp;FILTRAR
          </Button>
        )}
      </FiltersCardActionButtons>
    </FiltersCard>
  );
};
