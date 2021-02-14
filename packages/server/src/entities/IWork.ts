import { IClient } from './IClient';
import { IService } from './IService';

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
  createdAt?: Date;
  updatedAt?: Date;
}
