import { IClient } from './entities/IClient';
import { IVehicle } from './entities/IVehicle';
import { IWork } from './entities/IWork';

export interface IPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}

export interface IClientsListFilters extends Partial<Pick<IClient, 'name'|'document'|'group'>> {
  pagination: boolean;
}

export interface IWorksListFilters extends Partial<Pick<IWork, 'identifier'|'value'|'details'|'status'>> {
  pagination: boolean;

  name?: string;
  document?: string;
  group?: string;
  service?: string;
  sector?: string;
}

export interface IVehiclesListFilters extends Partial<Omit<IVehicle, 'id'|'client'|'type'|'details'|'status'|'createdAt'|'updatedAt'>> {
  pagination: boolean;

  status?: string|string[];
  group?: string;
  plateEnd?: string;
  includeTruck?: string;
}
