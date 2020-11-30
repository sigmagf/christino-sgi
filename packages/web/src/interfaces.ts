export interface IPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}

export interface IStorage {
  token: string;
  sidebarExpanded: boolean;
}

export interface IAPIPaths {
  '/receipts': IPagination<IReceipt>;
  '/clients': IPagination<IClient>;
  '/vehicles': IPagination<IVehicle>;
  '/users': IPagination<IUser>;
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

export interface IUserAuth {
  user: IUser;
  token: string;
}
