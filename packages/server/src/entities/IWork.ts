import { IClient } from './IClient';
import { IService } from './IService';
import { IWorkHistory } from './IWorkHistory';

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
  createdAt?: Date;
  updatedAt?: Date;
}
