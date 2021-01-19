import { useState, useEffect } from 'react';

import { IStorage } from '~/interfaces';

import useLocalSotorage from './useLocalStorage';

export default function usePersistedState<T extends keyof IStorage>(key: T, initialState: IStorage[T]) {
  const storage = useLocalSotorage();

  const [value, setValue] = useState<IStorage[T]>(() => {
    const storageValue = storage.getItem(key);

    return storageValue || initialState;
  });

  useEffect(() => {
    storage.setItem(key, value);
  }, [key, value, storage]);

  return { value, setValue };
}
