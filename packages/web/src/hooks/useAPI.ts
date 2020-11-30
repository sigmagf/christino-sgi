import { AxiosRequestConfig } from 'axios';
import useSWR, { ConfigInterface } from 'swr';
import { fetcherFn } from 'swr/dist/types';

import { IPaths } from '~/interfaces';
import { api } from '~/services/api';

import useLocalStorage from './useLocalStorage';

type SWRConfig<T> = ConfigInterface<T, any, fetcherFn<T>>;
type SWRProps<T> = Omit<SWRConfig<T>, 'revalidateOnReconnect'|'errorRetryCount'|'errorRetryInterval'>

type AxiosProps = Omit<AxiosRequestConfig, 'baseURL'|'url'|'method'> & {
  query: string;
};

function useAPI<T extends keyof IPaths>(url: T, axiosProps?: AxiosProps, swrProps?: SWRProps<IPaths[T]>) {
  const storage = useLocalStorage();

  const { data, error, mutate } = useSWR<IPaths[T]>(url, async (path) => {
    const response = await api({
      ...axiosProps,
      method: 'GET',
      url: path + (axiosProps?.query && `?${axiosProps.query}`),
      headers: {
        ...axiosProps?.headers,
        authorization: `Bearer ${storage.getItem('token')}`,
      },
    });

    return response.data;
  }, {
    ...swrProps,
    revalidateOnReconnect: true,
    errorRetryCount: 5,
    errorRetryInterval: 30000,
  });

  return { data, error, mutate };
}

export default useAPI;
