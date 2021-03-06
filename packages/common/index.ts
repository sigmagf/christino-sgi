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

  createdAt: Date;
  updatedAt: Date;
}

export interface ILogError {
  id: string;
  userId: string;
  user: IUser;
  message: string;
  error: string;

  createdAt: string;
  updatedAt: string;
}

export interface IClient {
  id: string;
  name: string;
  document: string;
  group?: string;
  email?: string;
  phone1?: string;
  phone2?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ISector {
  id: string;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IService {
  id: string;
  name: string;
  sectorId: string;
  sector: ISector;

  createdAt: Date;
  updatedAt: Date;
}

export interface IVehicle {
  id: string;
  clientId: string;
  client: IClient;
  plate: string;
  renavam: string;
  crv?: string;
  brandModel: string;
  type: string;
  details?: string;
  status: number;
  crlveIncluded?: boolean;
  withdrawalIncluded?: boolean;

  createdAt: Date;
  createdBy: string;
  createdByUser: IUser;
  updatedAt: Date;
  updatedBy: string;
  updatedByUser: IUser;
}

export interface IWork {
  id: string;
  clientId: string;
  client: IClient;
  serviceId: string;
  service: IService;
  identifier: string;
  value: number;
  details: string;
  status: number;
  histories: IWorkHistory[];

  createdAt: Date;
  createdBy: string;
  createdByUser: IUser;
  updatedAt: Date;
  updatedBy: string;
  updatedByUser: IUser;
}

export interface IWorkHistory {
  id: string;
  workId: string;
  details: string;

  createdAt: Date;
  updatedAt: Date;
}
