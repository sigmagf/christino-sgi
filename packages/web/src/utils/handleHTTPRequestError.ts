import { toast } from 'react-toastify';

import { useLocalStorage } from '~/hooks';

export function handleHTTPRequestError(err: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const storage = useLocalStorage();

  if(err.message === 'Network Error') {
    toast.error('Verifique sua conexão com a internet.');
  } else if(err.response && err.response.data && err.response.data.message) {
    console.log(err.response.data);
    
    if(err.response.data.code === 401) {
      storage.setItem('token', null);
    }
    
    toast.error(err.response.data.message);
  } else {
    toast.error('Ocorreu um erro inesperado.');
  }
}
