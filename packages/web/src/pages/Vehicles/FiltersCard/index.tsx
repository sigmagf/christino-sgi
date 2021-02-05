import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState, useEffect } from 'react';
import { FaLayerGroup, FaPlus, FaFilter, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Select, Input } from '~/components/Form';
import { useLocalStorage } from '~/hooks';
import { IClient, IVehiclesFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { vehiclePlateEnd as plateEnd, vehicleStatus as status } from '~/utils/commonSelectOptions';

import { FiltersCard, FiltersCardActionButtons, FiltersContainer, FiltersHeaders } from './styles';

interface IVehiclesFiltersCardProps {
  onOpenImportModalClick: () => void;
  onOpenCreateModalClick: () => void;
  onFiltersApplyClick: (data: Omit<IVehiclesFilters, 'page'|'limit'>) => void;
  desp_permission: number;
}

export const VehiclesFiltersCard: React.FC<IVehiclesFiltersCardProps> = ({ onOpenCreateModalClick, onOpenImportModalClick, onFiltersApplyClick, desp_permission }) => {
  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();

  let timer: any;

  const [open, setOpen] = useState(true);
  const [groups, setGroups] = useState([{ label: 'TODOS', value: '' }]);
  const [clients, setClients] = useState([{ label: 'TODOS', value: '' }]);

  const includeTruckOptions = [
    {
      value: '0',
      label: 'SEM CAMINHÕES',
    }, {
      value: '1',
      label: 'AMBOS',
    }, {
      value: '2',
      label: 'APENAS CAMINHOES',
    },
  ];

  const getClients = async (name: string) => {
    if(name === null || name === undefined || name.trim() === '' || name.trim().length < 3) {
      return;
    }
    
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

  const onClientsInputChange = () => {
    clearTimeout(timer);

    timer = setTimeout(() => { getClients('a'); }, 1000);
  };

  const getGroups = async () => {
    try {
      const response = await api.get<string[]>('/clients/groups', { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      const data = response.data.map((group) => ({ value: group, label: group }));
      setGroups([{ label: 'TODOS', value: '' }, ...data]);
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

  useEffect(() => {
    getGroups();
  }, []); // eslint-disable-line

  return (
    <FiltersCard>
      <FiltersContainer open={open}>
        <Form ref={formRef} onSubmit={(data) => onFiltersApplyClick(data)}>
          <Select label="CLIENTE" name="client_id" style={{ gridArea: 'CN' }} options={clients} defaultValue={clients[0]} onKeyDown={onClientsInputChange} />
          <Select label="GRUPO" name="group" style={{ gridArea: 'CG' }} options={groups} defaultValue={groups[0]} />
          <Select label="STATUS" name="status" style={{ gridArea: 'VS' }} options={status} defaultValue={[status[1], status[2], status[3]]} isMulti />

          <Input label="PLACA" name="plate" style={{ gridArea: 'VP' }} />
          <Input label="RENAVAM" name="renavam" style={{ gridArea: 'VR' }} />
          <Input label="CRV" name="crv" style={{ gridArea: 'VC' }} />
          <Input label="MARCA/MODELO" name="brand_model" style={{ gridArea: 'VM' }} />
          <Select label="FINAL DE PLACA" name="plate_end" style={{ gridArea: 'VF' }} options={plateEnd} defaultValue={plateEnd[0]} />
          <Select label="CAMINHOES" name="include_truck" style={{ gridArea: 'VT' }} options={includeTruckOptions} defaultValue={includeTruckOptions[1]} />
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
        {desp_permission >= 2 && (
          <>
            <Button variant="success" style={{ width: 175.97 }} onClick={onOpenCreateModalClick}>
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
