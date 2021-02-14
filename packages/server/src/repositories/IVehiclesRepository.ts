import { IVehicle } from '~/entities/IVehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';

export interface IVehiclesRepository {
  list(page: number, limit: number, filters: IVehiclesListFilters): Promise<IPagination<IVehicle> | IVehicle[]>;
  findById(id: string): Promise<IVehicle>;
  findByClientPlate(clientId: string, plate: string): Promise<IVehicle>;
  findByClientRenavam(clientId: string, renavam: string): Promise<IVehicle>;

  create(data: Omit<IVehicle, 'id'|'client'|'createdAt'|'updatedAt'>): Promise<IVehicle>;
  update(id: string, data: Omit<IVehicle, 'id'|'client'|'createdAt'|'updatedAt'>): Promise<IVehicle>;

  delete(id: string): Promise<void>;
}
