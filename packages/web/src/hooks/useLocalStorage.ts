import { IStorage } from '~/interfaces';

const useLocalStorage = () => {
  function getItem<T extends keyof IStorage>(path: T): IStorage[T]|null {
    console.log(`Data requested from local storage: ${process.env.REACT_APP_LOCALSTORAGE_BASE}/${path}.`);

    const value = localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`) || '';

    if(value) {
      return JSON.parse(value);
    }

    return null;
  }

  function setItem<T extends keyof IStorage>(path: T, value: IStorage[T]) {
    console.log(`Data saved from local storage ${process.env.REACT_APP_LOCALSTORAGE_BASE}/${path}.`);

    if(value) {
      localStorage.setItem((`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`), JSON.stringify(value));
    } else {
      localStorage.removeItem(`${process.env.REACT_APP_LOCALSTORAGE_BASE || ''}/${path}`);
    }
  }

  function clear() {
    console.log('Data clear from local storage.');

    localStorage.clear();
  }

  return {
    getItem,
    setItem,
    clear,
  };
};

export default useLocalStorage;
