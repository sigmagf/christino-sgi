import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { IStorage } from '~/interfaces';

import useLocalSotorage from './useLocalStorage';

type Response<T extends keyof IStorage> = [IStorage[T], Dispatch<SetStateAction<IStorage[T]>>];

export default function usePersistedState<T extends keyof IStorage>(key: T, initialState: IStorage[T]): Response<T> {
  const storage = useLocalSotorage();

  const [state, setState] = useState<IStorage[T]>(() => {
    const storageValue = storage.getItem(key);

    return storageValue || initialState;
  });

  useEffect(() => {
    storage.setItem(key, state);
  }, [key, state, storage]);

  return [state, setState];
}
