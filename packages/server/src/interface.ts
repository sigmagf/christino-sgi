export interface ICliente {
  id: string;
  name: string;
  document: string;
  group: string|null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVeiculo {
  id: string;
  plate: string;
  renavam: string;
  brandModel: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRecibo {
  id: string;
  client: ICliente;
  vehicle: IVeiculo;
  details: string|null;
  status: string;
  issuedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}
