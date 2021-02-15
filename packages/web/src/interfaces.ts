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
  brandModel: string;
  type: string;
  details: string;
  status: string;
}
/* END IMPORT VEHICLES */

/* BACKEND */
export interface IVehiclesFilters {
  page: number;
  limit: number;

  clientId?: string;
  group?: string;
  plate?: string;
  renavam?: string;
  crv?: string;
  brandModel?: string;
  plateEnd?: string;
  status: number|number[];
  includeTruck?: boolean;
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

export interface ISector {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  id: string;
  sectorId: string;
  sector: ISector;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWorkHistory {
  id: string;
  workId: string;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWork {
  id: string;
  clientId: string;
  client: IClient;
  serviceId: string;
  service: IService;
  identifier?: string;
  value: number;
  details?: string;
  status: number;
  histories: IWorkHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClient {
  id: string;
  name: string;
  document: string;
  group: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  despPermission: number;
  seguPermission: number;
  cliePermission: number;
  userPermission: number;
  workPermission: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVehicle {
  id: string;
  client: IClient;
  plate: string;
  renavam: string;
  crv: string;
  brandModel: string;
  type: string;
  details: string;
  status: number;
  crlveIncluded: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserAuth {
  user: IUser;
  token: string;
}
/* END BACKEND */
