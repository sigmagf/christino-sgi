import { Vehicle } from '~/entities/Vehicle';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertStatus } from '~/utils/convertStatus';
import { stringFix } from '~/utils/stringFix';

import { IImportError, IVehiclesImportRequestDTO } from './dto';

export class VehiclesImportService {
  constructor(
    private vehiclesRepo: IVehiclesRepository,
    private clientsRepo: IClientsRepository,
  ) { }

  async execute({ data }: IVehiclesImportRequestDTO): Promise<void> {
    const errors: IImportError[] = [];

    const vehicles = await Promise.all(data.map(async (vehicle): Promise<Omit<Vehicle, 'id'|'client'|'created_at'|'updated_at'> | null> => {
      if(!vehicle.name || !vehicle.document) {
        errors.push({ ...vehicle, error: 'Client name or document are null or invalid' });
        return null;
      }

      if(!vehicle.plate || !vehicle.renavam || !vehicle.brand_model || !vehicle.type) {
        errors.push({ ...vehicle, error: 'Vehicle plate, renavam, brand_model or type are null or invalid' });
        return null;
      }

      try {
        const client = await this.clientsRepo.create({
          name: stringFix(vehicle.name, undefined, 'UPPERCASE'),
          document: stringFix(vehicle.document, undefined, 'UPPERCASE'),
          group: stringFix(vehicle.group, undefined, 'UPPERCASE'),
        });

        return {
          client_id: client.id,
          plate: stringFix(vehicle.plate, undefined, 'UPPERCASE'),
          renavam: stringFix(vehicle.renavam, undefined, 'UPPERCASE'),
          crv: stringFix(vehicle.crv, undefined, 'UPPERCASE'),
          brand_model: stringFix(vehicle.brand_model, undefined, 'UPPERCASE'),
          type: stringFix(vehicle.type, undefined, 'UPPERCASE'),
          details: stringFix(vehicle.details, undefined, 'UPPERCASE'),
          status: convertStatus(stringFix(vehicle.status, undefined, 'LOWERCASE')),
        };
      } catch(err) {
        errors.push({ ...vehicle, error: err.message || 'Unexprected error' });
        return null;
      }
    }));

    await Promise.all(vehicles.filter((el) => el !== null).map(async (vehicle) => {
      if(!vehicle.client_id) {
        errors.push({ ...vehicle, error: 'Client not found!' });
        return;
      }

      if(await this.vehiclesRepo.findByClientPlate(vehicle.client_id, vehicle.plate)) {
        errors.push({ ...vehicle, error: 'Plate already exists for this client' });
        return;
      }

      if(await this.vehiclesRepo.findByClientRenavam(vehicle.client_id, vehicle.renavam)) {
        errors.push({ ...vehicle, error: 'Renavam already exists for this client' });
        return;
      }

      try {
        await this.vehiclesRepo.create(vehicle);
      } catch(err) {
        errors.push({ ...vehicle, error: err.message || 'Unexpected error' });
      }
    }));

    if(errors.length > 0) {
      throw new Error(`IMPORTERROR-${JSON.stringify(errors)}`);
    }
  }
}
