import { Vehicle } from '~/entities/Vehicle';
import { IPagination } from '~/interface';
import { RepoVehicleListFilters } from '~/types';

export interface IVehiclesRepository {
  find(id: string, plate: string, renavam: string): Promise<Vehicle>;
  findOrCreate(vehicle: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>): Promise<Vehicle>;
  list(page: number, limit: number, filters?: RepoVehicleListFilters): Promise<IPagination<Vehicle>>;
  save(vehicle: Vehicle): Promise<Vehicle>;
  update(id: string, vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle>;
  delete(id: string): Promise<void>;
}
