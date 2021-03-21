import React, { createContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import { useLocalStorage } from '~/hooks';
import { IUserPermissions } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

type UserPermissionsContextType = IUserPermissions & {
  setPerms: (perms: IUserPermissions) => void;
}

export const UserPermissionsContext = createContext<UserPermissionsContextType>({
  cliePermission: 0,
  despPermission: 0,
  seguPermission: 0,
  userPermission: 0,
  workPermission: 0,
  setPerms: (perms: IUserPermissions) => {},
});

export const UserPermissionsProvider: React.FC = ({ children }) => {
  const storage = useLocalStorage();

  const [perms, setPerms] = useState<IUserPermissions>({
    cliePermission: 0,
    despPermission: 0,
    seguPermission: 0,
    userPermission: 0,
    workPermission: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      setLoading(true);

      try {
        const response = await api.get<IUserPermissions>('/users/valid', { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        setPerms(response.data);
      } catch(err) {
        handleHTTPRequestError(err);
      }

      setLoading(false);
    };

    validate();
  }, []) // eslint-disable-line

  if(loading) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ReactLoading type="bars" />
      </div>
    );
  }

  return (
    <UserPermissionsContext.Provider value={{ ...perms, setPerms }}>
      { children }
    </UserPermissionsContext.Provider>
  );
};
