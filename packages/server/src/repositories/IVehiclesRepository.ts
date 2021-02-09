import { Vehicle } from '~/entities/Vehicle';

import { IPagination, IVehiclesListFilters } from '~/interfaces';

export interface IVehiclesRepository {
  list(page: number, limit: number, filters: IVehiclesListFilters): Promise<IPagination<Vehicle> | Vehicle[]>;
  findById(id: string): Promise<Vehicle>;
  findByClientPlate(client_id: string, plate: string): Promise<Vehicle>;
  findByClientRenavam(client_id: string, plate: string): Promise<Vehicle>;

  create(data: Omit<Vehicle, 'id'|'client'|'created_at'|'updated_at'>): Promise<Vehicle>;
  update(id: string, data: Omit<Vehicle, 'id'|'client'|'created_at'|'updated_at'>): Promise<Vehicle>;

  delete(id: string): Promise<void>;
}
