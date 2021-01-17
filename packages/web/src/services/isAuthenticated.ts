import { IUseLocalStorage, IUser } from '~/interfaces';

import { api } from './api';

export async function isAuthenticated(storage: IUseLocalStorage): Promise<boolean> {
  return true;

  const token = storage.getItem('token');

  if(!token) {
    return false;
  }

  try {
    const request = await api.get<IUser>('/users/valid', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    storage.setItem('userName', request.data.name);

    return true;
  } catch(err) {
    storage.setItem('token', null);
    return false;
  }
}
