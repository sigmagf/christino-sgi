import { Vehicle } from '~/entities/Vehicle';

export type errorType = Partial<Omit<Vehicle, 'id'|'client'|'createdAt'|'updatedAt'>> & {error: string};

export interface IVehiclesImportRequestDTO {
  data: {
    name: string;
    document: string;
    group: string;
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
