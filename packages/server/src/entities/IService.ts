import { ISector } from './ISector';

export interface IService {
  id: string;
  name: string;
  sectorId: string;
  sector: ISector;
  createdAt?: Date;
  updatedAt?: Date;
}
