import { Vehicle } from '~/entities/Vehicle';

export interface IVehiclesUpdateRequestDTO extends Partial<Omit<Vehicle, 'client_id'|'client'|'created_at'|'updated_at'>> {
  name?: string;
  document?: string;
  group?: string;
}
