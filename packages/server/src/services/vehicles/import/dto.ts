import { Vehicle } from '~/entities/Vehicle';

export type errorType = Omit<Vehicle, 'id'|'client'|'created_at'|'updated_at'> & {error: string};

export interface IVehiclesImportRequestDTO {
  data: {
    name: string;
    document: string;
    folder: string;
    plate: string;
    renavam: string;
    cla: string;
    crv: string;
    brand_model: string;
    type: string;
    details: string;
    status: string;
    issued_on: string;
  }[];
}
