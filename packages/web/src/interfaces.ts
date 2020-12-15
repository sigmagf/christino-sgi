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

/* BACKEND */
export interface IPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}

export interface IClient {
  id: string;
  name: string;
  document: string;
  group: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVehicle {
  id: string;
  plate: string;
  renavam: string;
  brandModel: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICRV {
  clientId: string;
  client: IClient;
  vehicleId: string;
  vehicle: IVehicle;
  details: string;
  status: string;
  issuedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICRVFilter {
  client: IClient;
  vehicle: IVehicle & {
    licensingMonth: string;
  },
  status: string;
}

export interface IUserAuth {
  user: IUser;
  token: string;
}
/* END BACKEND */
