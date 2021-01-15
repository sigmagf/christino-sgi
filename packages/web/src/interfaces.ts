/* STORAGE */
export interface IUseLocalStorage {
  getItem: <T extends keyof IStorage>(path: T) => IStorage[T]|null;
  setItem: <T extends keyof IStorage>(path: T, value: IStorage[T]) => void;
  clear: () => void;
}

export interface IStorage {
  token: string|null;
  userName: string|null;
}
/* END STIRAGE */
