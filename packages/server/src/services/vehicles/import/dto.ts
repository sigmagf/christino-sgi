import { Vehicle } from '~/entities/Vehicle';

export type errorType = Omit<Vehicle, 'id'|'client'|'created_at'|'updated_at'> & {error: string};

interface IVehiclesImportClientRequestDTO {
  name: string;
  document: string;
  group: string;
}

export interface IVehiclesImportRequestDTO {
  data: {
    client: IVehiclesImportClientRequestDTO;
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
