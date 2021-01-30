/* STORAGE */
export interface IUseLocalStorage {
  getItem: <T extends keyof IStorage>(path: T) => IStorage[T] | null;
  setItem: <T extends keyof IStorage>(path: T, value: IStorage[T] | null) => void;
  clear: () => void;
}

export interface IStorage {
  token: string;
  userName: string;
  appBarExpanded: boolean;
  desp_permission: string;
  segu_permission: string;
}
/* END STIRAGE */

/* IMPORT VEHICLES */
export interface IVehiclesImportCSV {
  name: string;
  document: string;
  group: string | null;

  plate: string;
  renavam: string;
  crv: string | null;
  brand_model: string;
  type: string;
  details: string;
  status: string;
}
/* END IMPORT VEHICLES */

/* BACKEND */
export interface IVehiclesFilters {
  page: number;
  limit: number;

  client_id?: string;
  group?: string;
  plate?: string;
  renavam?: string;
  crv?: string;
  brand_model?: string;
  plate_end?: string;
  status: number|number[];
  include_truck?: boolean;
}

export interface IClientsFilters {
  page: number;
  limit: number;

  name?: string;
  document?: string;
  group?: string;
}

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
  email?: string;
  phone1?: string;
  phone2?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  desp_permission: number;
  segu_permission: number;
  clie_permission: number;
  user_permission: number;
  created_at?: Date;
  updated_at?: Date;
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
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserAuth {
  user: IUser;
  token: string;
}
/* END BACKEND */
