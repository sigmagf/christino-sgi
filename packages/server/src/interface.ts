export interface IToken {
  id: string;
  iat: number;
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
