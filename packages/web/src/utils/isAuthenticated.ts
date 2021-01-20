import { IUseLocalStorage, IUser } from '~/interfaces';

import { api } from './api';

export async function isAuthenticated(storage: IUseLocalStorage): Promise<boolean> {
  const token = storage.getItem('token');

  if(!token) {
    return false;
  }

  try {
    await api.get<IUser>('/users/valid', {
      headers: {
        authorization: `Bearer ${storage.getItem('token')}`,
      },
    });

    return true;
  } catch(err) {
    storage.setItem('token', null);
    return false;
  }
}
