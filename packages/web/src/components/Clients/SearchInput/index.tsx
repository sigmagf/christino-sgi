import { IClient } from '@christino-sgi/common';
import React, { useState } from 'react';

import { Select } from '~/components/UI/Form';
import { useLocalStorage } from '~/hooks';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

interface ISearchInput {
  disabled?: boolean;
  label?: string;
  name?: string;
  includeAll?: boolean;
  defaultValue?: {
    label: string;
    value: string;
  };
}

export const ClientsSearchInput: React.FC<ISearchInput> = ({ disabled = false, label = 'CLIENTE', name = 'clientId', defaultValue, includeAll = false }) => {
  const storage = useLocalStorage();
  let timer: NodeJS.Timeout;

  const [clients, setClients] = useState<{ label: string; value: string }[]>(defaultValue ? [defaultValue] : []);

  const handleGetClientsToSelect = async (param: string) => {
    if(!param || !setClients) {
      return;
    }

    try {
      if(param.length === 11 || param.length === 14) {
        const response = await api.get<IClient>(`/clients/${param}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        const data = { value: response.data.id, label: `${response.data.document.padStart(14, '*')} - ${response.data.name}` };
        if(includeAll) {
          setClients([{ value: '', label: 'TODOS' }, data]);
        } else {
          setClients([data]);
        }
      } else {
        const response = await api.get<IClient[]>(`/clients?noPagination=true&name=${param}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        const data = response.data.map((client) => ({ value: client.id, label: `${client.document.padStart(14, '*')} - ${client.name}` }));

        if(includeAll) {
          setClients([{ value: '', label: 'TODOS' }].concat(data));
        } else {
          setClients(data);
        }
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }
  };

  const onClientsInputChange = (param: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => { handleGetClientsToSelect(param); }, 1000);
  };

  return (
    <Select name={name} isDisabled={disabled} label={label} options={clients} defaultValue={defaultValue} onInputChange={onClientsInputChange} />
  );
};
