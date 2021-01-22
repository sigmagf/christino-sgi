import { Vehicle } from '~/entities/Vehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';

export interface IVehiclesRepository {
  list(page: number, limit: number, filters: IVehiclesListFilters): Promise<IPagination<Vehicle> | Vehicle[]>;
  findById(id: string): Promise<Vehicle>;
  findByPlate(plate: string): Promise<Vehicle>;
  findByRenavam(renavam: string): Promise<Vehicle>;
  findByClientPlate(clientId: string, plate: string): Promise<Vehicle>;
  findByClientRenavam(clientId: string, plate: string): Promise<Vehicle>;

  create(data: Omit<Vehicle, 'id'|'client'|'createdAt'|'updatedAt'>): Promise<Vehicle>;
  update(id: string, data: Omit<Vehicle, 'id'|'client'|'createdAt'|'updatedAt'>): Promise<Vehicle>;

  delete(id: string): Promise<void>;
}
