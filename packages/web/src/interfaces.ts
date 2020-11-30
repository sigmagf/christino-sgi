export interface IPagination<T> {
  total: number;
  current: number;
  limit: number;
  result: Array<T>;
}

export interface IStorage {
  token: string;
  sidebarExpanded: boolean;
}

export interface IPaths {
  '/receipts': IPagination<IReceipt>;
  '/clients': IPagination<IClient>;
  '/vehicles': IPagination<IVehicle>;
  '/users': IPagination<IUser>;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserAuth {
  user: IUser;
  token: string;
}

export interface IClient {
  id: string;
  name: string;
  document: string;
  group: string;
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

export interface IReceipt {
  id: string;
  client: IClient;
  vehicle: IVehicle;
  details: string;
  status: string;
  issuedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}
