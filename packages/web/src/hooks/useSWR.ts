import swr from 'swr';

import { api } from '~/utils/api';

import useLocalStorage from './useLocalStorage';

export function useSWR<T = any>(url: string) {
  const storage = useLocalStorage();

  const swrResponse = swr<T>(url, async (urlSwr) => {
    const response = await api.get<T>(urlSwr, {
      headers: {
        authorization: `Bearer ${storage.getItem('token')}`,
      },
    });

    return response.data;
  }, {});

  return swrResponse;
}
