import { IPagination, IVehicle } from '@christino-sgi/common';

import { IVehiclesListFilters } from '~/interfaces';

export type VehiclesCreateOrUpdate = Omit<IVehicle, 'id'|'client'|'createdAt'|'createdBy'|'createdByUser'|'updatedAt'|'updatedBy'|'UpdatedByUser'>

export interface IVehiclesRepository {
  list(page: number, maxResults: number, filters: IVehiclesListFilters): Promise<IPagination<IVehicle> | IVehicle[]>;
  findById(id: string): Promise<IVehicle>;
  findByClientPlate(clientId: string, plate: string): Promise<IVehicle>;
  findByClientRenavam(clientId: string, renavam: string): Promise<IVehicle>;

  create(data: VehiclesCreateOrUpdate): Promise<IVehicle>;
  update(id: string, data: Partial<VehiclesCreateOrUpdate>): Promise<IVehicle>;

  delete(id: string): Promise<void>;
}
