import { IClient } from './IClient';

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
  createdAt?: Date;
  updatedAt?: Date;
}
