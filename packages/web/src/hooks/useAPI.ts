import axios, { AxiosRequestConfig } from 'axios';
import useSWR, { ConfigInterface } from 'swr';
import { fetcherFn } from 'swr/dist/types';

type SWRConfig<T> = ConfigInterface<T, any, fetcherFn<T>>;

type AxiosProps = Omit<AxiosRequestConfig, 'baseURL'|'url'>;
type SWRProps<T> = Omit<SWRConfig<T>, 'revalidateOnReconnect'|'errorRetryCount'|'errorRetryInterval'>

function useAPI<T>(url: string, axiosProps: AxiosProps, swrProps?: SWRProps<T>) {
  const { data, error, mutate } = useSWR<T>(url, async (path) => {
    const response = await axios({
      ...axiosProps,
      baseURL: process.env.REACT_APP_API_URL,
      url: path,
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
