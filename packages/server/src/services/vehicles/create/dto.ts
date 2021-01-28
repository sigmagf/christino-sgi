import { Vehicle } from '~/entities/Vehicle';

export interface IVehiclesCreateRequestDTO extends Pick<Vehicle, 'plate'|'renavam'|'crv'|'brand_model'|'type'|'details'|'status'> {
  name: string;
  document: string;
  group: string;
}
