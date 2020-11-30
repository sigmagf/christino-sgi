import { IStorage } from '~/interfaces';

const useLocalStorage = () => {
  function getItem<T extends keyof IStorage>(path: T): IStorage[T] {
    console.log(`Data requested from local storage: ${process.env.REACT_APP_LOCALSTORAGE_BASE}/${path}`);

    const value = localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`) || '';

    return JSON.parse(value);
  }

  function setItem<T extends keyof IStorage>(path: T, value: IStorage[T]) {
    console.log(`Data saved from local storage ${process.env.REACT_APP_LOCALSTORAGE_BASE}/${path}`);

    localStorage.setItem((`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`), JSON.stringify(value));
  }

  return {
    getItem,
    setItem,
  };
};

export default useLocalStorage;
