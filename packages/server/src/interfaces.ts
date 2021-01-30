import { Client } from './entities/Client';
import { Vehicle } from './entities/Vehicle';

export interface IPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}

export interface IClientsListFilters extends Pick<Client, 'name'|'document'|'group'> {
  pagination: boolean;
}

export interface IVehiclesListFilters extends Omit<Vehicle, 'id'|'client'|'type'|'details'|'status'|'created_at'|'updated_at'> {
  pagination: boolean;
  status: string|string[];
  group: string;
  plate_end: string;
}
