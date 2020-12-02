import { Vehicle } from '~/entities/Vehicle';
import { IPagination } from '~/interface';
import { RepoVehiclesFindOrCreate, RepoVehiclesListFilters, RepoVehiclesSave, RepoVehiclesUpdate } from '~/types';

export interface IVehiclesRepository {
  find(id: string): Promise<Vehicle>;
  findByPlate(plate: string): Promise<Vehicle>;
  findByRenavam(renavam: string): Promise<Vehicle>;
  findOrCreate(vehicle: RepoVehiclesFindOrCreate): Promise<Vehicle>;
  list(page: number, limit: number, filters?: RepoVehiclesListFilters): Promise<IPagination<Vehicle>>;
  save(vehicle: RepoVehiclesSave): Promise<Vehicle>;
  update(id: string, vehicle: RepoVehiclesUpdate): Promise<Vehicle>;
  delete(id: string): Promise<void>;
}
