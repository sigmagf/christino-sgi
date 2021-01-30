import { IUseLocalStorage, IUser } from '~/interfaces';

import { api } from './api';

export async function isAuthenticated(storage: IUseLocalStorage) {
  const token = storage.getItem('token');

  if(!token) {
    return {
      state: false,
      desp_permission: 0,
      segu_permission: 0,
    };
  }

  try {
    const request = await api.get<IUser>('/users/valid', {
      headers: { authorization: `Bearer ${storage.getItem('token')}` },
    });

    storage.setItem('userName', request.data.name);
    return {
      state: true,
      desp_permission: request.data.desp_permission,
      segu_permission: request.data.segu_permission,
    };
  } catch(err) {
    storage.setItem('token', null);
    return {
      state: false,
      desp_permission: 0,
      segu_permission: 0,
    };
  }
}
