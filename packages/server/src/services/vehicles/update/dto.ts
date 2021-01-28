import { Vehicle } from '~/entities/Vehicle';

export interface IVehiclesUpdateRequestDTO extends Pick<Vehicle, 'id'|'plate'|'renavam'|'crv'|'brand_model'|'type'|'details'|'status'> {
  name: string;
  document: string;
  group: string;
}
