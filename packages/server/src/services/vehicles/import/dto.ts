import { Vehicle } from '~/entities/Vehicle';

export interface IImportError extends Partial<Omit<Vehicle, 'id'|'client'|'status'|'created_at'|'updated_at'>> {
  status: number | string;
  error: string;
}

export interface IVehiclesImportRequestDTO {
  data: {
    name: string;
    document: string;
    group: string;
    plate: string;
    renavam: string;
    crv: string;
    brand_model: string;
    type: string;
    details: string;
    status: string;
  }[];
}
