/* eslint-disable react-hooks/rules-of-hooks */
import { useLocalStorage } from '~/hooks';
import { IClient } from '~/interfaces';

import { api } from './api';
import { handleHTTPRequestError } from './handleHTTPRequestError';

type SetClientsType = (value: React.SetStateAction<{ label: string; value: string }[]>) => void;

export async function handleGetClientsToSelect(param: string, setClients: SetClientsType) {
  if(!param) {
    return;
  }

  const storage = useLocalStorage();

  try {
    if(param.length === 11 || param.length === 14) {
      const response = await api.get<IClient>(`/clients/${param}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      const data = { value: response.data.id, label: `${response.data.document.padStart(14, '*')} - ${response.data.name}` };
      setClients([data]);
    } else {
      const response = await api.get<IClient[]>(`/clients?noPagination=true&name=${param}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      const data = response.data.map((client) => ({ value: client.id, label: `${client.document.padStart(14, '*')} - ${client.name}` }));
      setClients(data);
    }
  } catch(err) {
    handleHTTPRequestError(err);
  }
}
