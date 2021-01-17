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

/* IMPORT VEHICLES */
export interface IVehiclesImportCSV {
  name: string;
  document: string;
  group: string;
  plate: string;
  renavam: string;
  crv: string;
  brand_model: string;
  type: string;
  details: string;
  status: number;
  issued_on: Date;
}

interface IVehiclesImportClientJSON {
  name: string;
  document: string;
  group: string;
}

export interface IVehiclesImportJSON {
  client: IVehiclesImportClientJSON;
  plate: string;
  renavam: string;
  crv: string;
  brand_model: string;
  type: string;
  details: string;
  status: number;
  issued_on: Date;
}
/* END IMPORT VEHICLES */

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
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IVehicle {
  id: string;
  client: IClient;
  plate: string;
  renavam: string;
  crv: string;
  brand_model: string;
  type: string;
  details: string;
  status: number;
  issued_on: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserAuth {
  user: IUser;
  token: string;
}
/* END BACKEND */
