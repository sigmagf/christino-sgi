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

    const vehicles = await Promise.all(data.map(async (vehicle): Promise<Omit<Vehicle, 'id'|'client'|'created_at'|'updated_at'> | null> => {
      if(!vehicle.name || !vehicle.document) {
        errors.push({
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          crv: vehicle.crv === '-' ? null : vehicle.crv,
          brand_model: vehicle.brand_model,
          type: vehicle.type,
          details: vehicle.details || null,
          issued_on: convertDate(vehicle.issued_on),
          status: convertStatus(vehicle.status.toLowerCase()),
          error: 'Client name or document are null or invalid',
        });

        return null;
      }

      if(!vehicle.plate || !vehicle.renavam || !vehicle.brand_model || !vehicle.type) {
        errors.push({
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          crv: vehicle.crv === '-' ? null : vehicle.crv,
          brand_model: vehicle.brand_model,
          type: vehicle.type,
          details: vehicle.details || null,
          issued_on: convertDate(vehicle.issued_on),
          status: convertStatus(vehicle.status.toLowerCase()),
          error: 'Vehicle plate, renavam, brandModel or type are null or invalid',
        });

        return null;
      }

      try {
        const client = await this.clientsRepo.create({
          name: vehicle.name,
          document: vehicle.document,
          group: vehicle.group,
        });

        return {
          client_id: client.id,
          plate: vehicle.plate.trim(),
          renavam: vehicle.renavam.trim(),
          crv: !vehicle.crv || vehicle.crv.trim() === '-' ? null : vehicle.crv.trim(),
          brand_model: vehicle.brand_model.trim(),
          type: vehicle.type.trim(),
          details: vehicle.details || null,
          issued_on: convertDate(vehicle.issued_on),
          status: convertStatus(vehicle.status.toLowerCase()),
        };
      } catch(err) {
        errors.push({
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          crv: vehicle.crv === '-' ? null : vehicle.crv,
          brand_model: vehicle.brand_model,
          type: vehicle.type,
          details: vehicle.details || null,
          issued_on: convertDate(vehicle.issued_on),
          status: convertStatus(vehicle.status.toLowerCase()),
          error: err.message || 'Unexprected error',
        });

        return null;
      }
    }));

    await Promise.all(vehicles.filter((el) => el !== null).map(async (vehicle) => {
      if(!vehicle.client_id) {
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

      try {
        await this.vehiclesRepo.create(vehicle);
      } catch(err) {
        errors.push({
          ...vehicle,
          error: err.message || 'Unexpected error',
        });
      }
    }));

    if(errors.length > 0) {
      throw new Error(`IMPORTERROR-${JSON.stringify(errors)}`);
    }
  }
}
