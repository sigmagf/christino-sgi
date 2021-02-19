import { toast } from 'react-toastify';

export function handleHTTPRequestError(err: any) {
  if(err.message === 'Network Error') {
    toast.error('Verifique sua conexão com a internet.');
  } else if(err.response && err.response.data && err.response.data.message) {
    toast.error(err.response.data.message);
  } else {
    toast.error('Ocorreu um erro inesperado.');
  }
}
