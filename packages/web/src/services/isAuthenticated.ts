import { IUseLocalStorage } from '~/interfaces';

export const isAuthenticated = (storage: IUseLocalStorage) => {
  const token = storage.getItem('token');

  if(!token) {
    return false;
  }

  return true;
};
