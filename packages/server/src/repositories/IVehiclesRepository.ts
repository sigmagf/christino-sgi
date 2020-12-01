import { Vehicle } from '~/entities/Vehicle';
import { IPagination } from '~/interface';

export type VehiclesRepositoryListFilters = Pick<Vehicle, 'plate'|'renavam'|'brandModel'|'type'>

export interface IVehiclesRepository {
  find(id: string, plate: string, renavam: string): Promise<Vehicle>;
  findOrCreate(vehicle: Vehicle): Promise<Vehicle>;
  list(page: number, limit: number, filters?: VehiclesRepositoryListFilters): Promise<IPagination<Vehicle>>;
  save(vehicle: Vehicle): Promise<Vehicle>;
  update(id: string, vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle>;
  delete(id: string): Promise<void>;
}
