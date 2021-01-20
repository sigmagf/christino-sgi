import axios, { AxiosRequestConfig } from 'axios';

import useLocalStorage from './useLocalStorage';

type AxiosConfig = Omit<AxiosRequestConfig, 'url'|'baseURL'|'method'|'headers'|'data'> & { body: AxiosRequestConfig['data'] };

export default async function useAPI(route: string, method: 'GET'|'POST'|'PUT'|'DELETE', options?: AxiosConfig) {
  const storage = useLocalStorage();

  const request = await axios({
    ...options,
    method,
    url: route,
    headers: {
      authorization: `Bearer ${storage.getItem('token')}`,
    },
  });

  return request;
}
