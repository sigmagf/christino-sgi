import { IStorage } from '~/interfaces';

export default function useLocalStorage() {
  function getItem<T extends keyof IStorage>(path: T): IStorage[T] | null {
    const value = localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`) || '';

    if(value) {
      return JSON.parse(value);
    }

    return null;
  }

  function setItem<T extends keyof IStorage>(path: T, value: IStorage[T] | null) {
    if(value) {
      localStorage.setItem((`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`), JSON.stringify(value));
    } else {
      localStorage.removeItem(`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`);
    }
  }

  function clear() {
    localStorage.clear();
  }

  return { getItem, setItem, clear };
}
