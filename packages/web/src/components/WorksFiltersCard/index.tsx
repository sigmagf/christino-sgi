import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useRef, useState } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';

import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Select, Input } from '~/interface/Form';
import { IClient, ISector, IService, IWorksFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { worksStatus as status } from '~/utils/commonSelectOptions';
import { formatMoney } from '~/utils/formatMoney';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

import { FiltersCard, FiltersCardActionButtons, FiltersCardForm } from './styles';

interface IWorksFiltersCardProps {
  onFiltersApplyClick: (data: Omit<IWorksFilters, 'page'|'limit'>) => void;
  onCreateClick: () => void;
}

export const WorksFiltersCard: React.FC<IWorksFiltersCardProps> = ({ onCreateClick, onFiltersApplyClick }) => {
  const storage = useLocalStorage();
  const permissions = storage.getItem('permissions');

  const formRef = useRef<FormHandles>(null);
  let timer: any;

  const { data: groups } = useSWR<string[]>('/clients/groups');
  const { data: services } = useSWR<IService[]>('/services?noPagination=true');
  const { data: sectors } = useSWR<ISector[]>('/sectors?noPagination=true');

  const [clients, setClients] = useState([{ label: 'TODOS', value: '' }]);

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

  /* - HANDLE VALUE FORMAT - */
  const onValueFocus = () => {
    if(formRef.current) {
      const value = formRef.current.getFieldValue('value').replace('.', '');
      formRef.current.setFieldValue('value', value);
    }
  };

  const onValueBlur = () => {
    if(formRef.current) {
      const value = formRef.current.getFieldValue('value').replace(',', '.');
      formRef.current.setFieldValue('value', formatMoney(value));
    }
  };
  /* END HANDLE VALUE FORMAT */

  const onSubmit: SubmitHandler<Omit<IWorksFilters, 'page'|'limit'>> = (data) => {
    onFiltersApplyClick({ ...data, value: data.value?.replace('.', '').replace(',', '.') || '' });
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

  const handleServiceOptions = () => {
    if(services) {
      const serviceGroups: {label: string; options: { label: string; value: string}[]}[] = [];

      services.forEach((option) => {
        if(!serviceGroups.find((gp) => gp.label === option.sector.name)) {
          // setSectors((old) => [...old, { value: option.sector.id, label: option.sector.name }]);
          serviceGroups.push({ label: option.sector.name, options: [] });
        }

        const i = serviceGroups.findIndex((gp) => gp.label === option.sector.name);
        serviceGroups[i].options.push({ label: option.name, value: option.id });
      });

      serviceGroups.forEach((group) => ({
        label: group.label,
        options: group.options.sort((a, b) => {
          if(a.label < b.label) return -1;
          if(a.label > b.label) return 1;
          return 0;
        }),
      }));

      return serviceGroups;
    }

    return [];
  };

  const handleSectorOptions = () => {
    if(sectors) {
      const array = sectors.map((sector) => ({ value: sector.id, label: sector.name }));

      return [{ label: 'TODOS', value: '' }, ...array];
    }

    return [{ label: 'TODOS', value: '' }];
  };

  if(!permissions) {
    return <>ERRO AO BUSCAR AS PERMISSÕES</>;
  }

  return (
    <FiltersCard>
      <FiltersCardForm ref={formRef} onSubmit={onSubmit}>
        <Select label="CLIENTE" name="clientId" options={clients} defaultValue={clients[0]} onInputChange={onClientsInputChange} />
        <Select label="GRUPO" name="group" options={handleGroups()} defaultValue={{ label: 'TODOS', value: '' }} />
        <Select label="STATUS" name="status" options={status} isMulti />

        <Input label="IDENTIFICADOR" name="identifier" />
        <Input label="VALOR" name="value" onFocus={onValueFocus} onBlur={onValueBlur} />
        <Select label="SERVIÇO" name="serviceId" options={handleServiceOptions()} defaultValue={{ label: 'TODOS', value: '' }} />
        <Select label="SETOR" name="sectorId" options={handleSectorOptions()} defaultValue={{ label: 'TODOS', value: '' }} />
      </FiltersCardForm>

      <FiltersCardActionButtons>
        {permissions!.workPermission >= 2 && (
          <Button variant="success" style={{ width: 175.97 }} onClick={onCreateClick}>
            <FaPlus />&nbsp;&nbsp;&nbsp;ADICIONAR O.S.
          </Button>
        )}
        <Button variant="secondary" style={{ width: 96.33 }} onClick={() => formRef.current && formRef.current.submitForm()}>
          <FaFilter />&nbsp;&nbsp;&nbsp;FILTRAR
        </Button>
      </FiltersCardActionButtons>
    </FiltersCard>
  );
};
