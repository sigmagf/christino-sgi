import swr, { ConfigInterface } from 'swr';
import { fetcherFn } from 'swr/dist/types';

import { api } from '~/utils/api';

import useLocalStorage from './useLocalStorage';

export function useSWR<T = any>(url: string, swrConfig?: ConfigInterface<T, any, fetcherFn<T>>) {
  const storage = useLocalStorage();

  const swrResponse = swr<T>(url, async (urlSwr) => {
    const response = await api.get<T>(urlSwr, {
      headers: {
        authorization: `Bearer ${storage.getItem('token')}`,
      },
    });

    return response.data;
  }, swrConfig);

  return swrResponse;
}
