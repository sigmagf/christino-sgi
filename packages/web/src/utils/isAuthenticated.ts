import { IUseLocalStorage, IUser } from '~/interfaces';

import { api } from './api';

export async function isAuthenticated(storage: IUseLocalStorage): Promise<boolean> {
  const token = storage.getItem('token');

  if(!token) {
    return false;
  }

  try {
    const request = await api.get<IUser>('/users/valid', {
      headers: {
        authorization: `Bearer ${storage.getItem('token')}`,
      },
    });

    storage.setItem('desp_permission', request.data.desp_permission);
    storage.setItem('segu_permission', request.data.segu_permission);
    storage.setItem('userName', request.data.name);
    return true;
  } catch(err) {
    storage.setItem('token', null);
    return false;
  }
}
