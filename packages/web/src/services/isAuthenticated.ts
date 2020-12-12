import { IUseLocalStorage, IUser } from '~/interfaces';

import { api } from './api';

export const isAuthenticated = async (storage: IUseLocalStorage) => {
  const token = storage.getItem('token');

  if(!token) {
    return false;
  }

  const request = await api.get<IUser>('/users/valid', {
    headers: {
      authorization: `Bearer ${storage.getItem('token')}`,
    },
  });

  if(request && request.data) {
    return true;
  }

  return false;
};
