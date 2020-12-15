import { Vehicle } from '~/entities/Vehicle';
import { RepoVehiclesFindOrCreate, RepoVehiclesListFilters, RepoVehiclesSave, RepoVehiclesUpdate } from '~/types';

export interface IVehiclesRepository {
  find(id: string): Promise<Vehicle>;
  findByPlate(plate: string): Promise<Vehicle>;
  findByRenavam(renavam: string): Promise<Vehicle>;
  findOrCreate(vehicle: RepoVehiclesFindOrCreate): Promise<Vehicle>;
  list(filters?: RepoVehiclesListFilters): Promise<Vehicle[]>;
  save(vehicle: RepoVehiclesSave): Promise<Vehicle>;
  update(id: string, vehicle: RepoVehiclesUpdate): Promise<Vehicle>;
  delete(id: string): Promise<void>;
}
