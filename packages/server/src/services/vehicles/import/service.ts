import { Vehicle } from '~/entities/Vehicle';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertDate } from '~/utils/convertDate';
import { convertStatus } from '~/utils/convertStatus';

import { errorType, IVehiclesImportRequestDTO } from './dto';

export class VehiclesImportService {
  constructor(
    private vehiclesRepo: IVehiclesRepository,
    private clientsRepo: IClientsRepository,
  ) { }

  async execute({ data }: IVehiclesImportRequestDTO): Promise<void> {
    const errors: errorType[] = [];

    const vehicles: Omit<Vehicle, 'id'|'client'|'created_at'|'updated_at'>[] = await Promise.all(data.map(async (vehicle) => {
      if(!vehicle.client || vehicle.client.document === null || vehicle.client.document.trim() === '') {
        errors.push({
          client_id: null,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          crv: vehicle.crv === '-' ? null : vehicle.crv,
          brand_model: vehicle.brand_model,
          type: vehicle.type,
          details: vehicle.details || null,
          issued_on: convertDate(vehicle.issued_on),
          status: convertStatus(vehicle.status.toLowerCase()),
          error: 'Invalid client',
        });

        return null;
      }

      if(vehicle.plate === null || vehicle.plate.trim() === '' || vehicle.renavam === null || vehicle.renavam.trim() === '') {
        errors.push({
          client_id: null,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          crv: vehicle.crv === '-' ? null : vehicle.crv,
          brand_model: vehicle.brand_model,
          type: vehicle.type,
          details: vehicle.details || null,
          issued_on: convertDate(vehicle.issued_on),
          status: convertStatus(vehicle.status.toLowerCase()),
          error: 'Invalid vehicle plate or renavam',
        });

        return null;
      }

      const client = await this.clientsRepo.findOrCreate({
        name: vehicle.client.name,
        document: vehicle.client.document,
        group: vehicle.client.group,
      });

      return {
        client_id: client.id,
        plate: vehicle.plate,
        renavam: vehicle.renavam,
        crv: vehicle.crv === '-' ? null : vehicle.crv,
        brand_model: vehicle.brand_model,
        type: vehicle.type,
        details: vehicle.details || null,
        issued_on: convertDate(vehicle.issued_on),
        status: convertStatus(vehicle.status.toLowerCase()),
      };
    }));

    await Promise.all(vehicles.filter((el) => el !== null).map(async (vehicle) => {
      if(vehicle.client_id === null || vehicle.client_id.trim() === '') {
        return;
      }

      if(await this.vehiclesRepo.findByClientPlate(vehicle.client_id, vehicle.plate)) {
        errors.push({
          ...vehicle,
          error: 'Plate already exists for this client',
        });

        return;
      }

      if(await this.vehiclesRepo.findByClientRenavam(vehicle.client_id, vehicle.renavam)) {
        errors.push({
          ...vehicle,
          error: 'Renavam already exists for this client',
        });

        return;
      }

      await this.vehiclesRepo.create(vehicle);
    }));

    if(errors.length > 0) {
      throw new Error(`IMPORTERROR-${JSON.stringify(errors)}`);
    }
  }
}
