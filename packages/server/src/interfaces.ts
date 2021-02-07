import { Client } from './entities/Client';
import { Vehicle } from './entities/Vehicle';
import { Work } from './entities/Work';

export interface IPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}

export interface IClientsListFilters extends Partial<Pick<Client, 'name'|'document'|'group'>> {
  pagination: boolean;
}

export interface IWorksListFilters extends Partial<Pick<Work, 'identifier'|'value'|'details'|'status'>> {
  pagination: boolean;
  name?: string;
  document?: string;
  group?: string;
  service?: string;
}

export interface IVehiclesListFilters extends Partial<Omit<Vehicle, 'id'|'client'|'type'|'details'|'status'|'created_at'|'updated_at'>> {
  pagination: boolean;
  status?: string|string[];
  group?: string;
  plate_end?: string;
  include_truck?: string;
}
