import { IVehicle } from '~/entities/IVehicle';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertStatus } from '~/utils/convertStatus';
import { stringFix } from '~/utils/stringFix';

interface IImportError extends Partial<Omit<IVehicle, 'id'|'client'|'status'|'created_at'|'updated_at'>> {
  status: number | string;
  error: string;
}

interface IVehiclesImportRequestDTO {
  data: {
    name: string;
    document: string;
    group: string;
    plate: string;
    renavam: string;
    crv: string;
    brandModel: string;
    type: string;
    details: string;
    status: string;
  }[];
}

export class VehiclesImportService {
  constructor(
    private vehiclesRepo: IVehiclesRepository,
    private clientsRepo: IClientsRepository,
  ) { }

  async execute({ data }: IVehiclesImportRequestDTO): Promise<void> {
    const errors: IImportError[] = [];

    const vehicles = await Promise.all(data.map(async (vehicle) => {
      if(!vehicle.name || !vehicle.document) {
        errors.push({ ...vehicle, error: 'Client name or document are null or invalid.' });
        return null;
      }

      if(!vehicle.plate || !vehicle.renavam || !vehicle.brandModel || !vehicle.type) {
        errors.push({ ...vehicle, error: 'Vehicle plate, renavam, brandModel or type are null or invalid.' });
        return null;
      }

      try {
        const client = await this.clientsRepo.create({
          name: stringFix(vehicle.name, undefined, 'UPPERCASE'),
          document: stringFix(vehicle.document, undefined, 'UPPERCASE'),
          group: stringFix(vehicle.group, undefined, 'UPPERCASE'),
        });

        return {
          clientId: client.id,
          plate: stringFix(vehicle.plate, undefined, 'UPPERCASE'),
          renavam: stringFix(vehicle.renavam, undefined, 'UPPERCASE'),
          crv: stringFix(vehicle.crv, undefined, 'UPPERCASE'),
          brandModel: stringFix(vehicle.brandModel, undefined, 'UPPERCASE'),
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
      if(!vehicle.clientId) {
        errors.push({ ...vehicle, error: 'Client not found.' });
        return;
      }

      if(await this.vehiclesRepo.findByClientPlate(vehicle.clientId, vehicle.plate)) {
        errors.push({ ...vehicle, error: 'Vehicle already exists for this client.' });
        return;
      }

      if(await this.vehiclesRepo.findByClientRenavam(vehicle.clientId, vehicle.renavam)) {
        errors.push({ ...vehicle, error: 'Vehicle already exists for this client.' });
        return;
      }

      try {
        await this.vehiclesRepo.create(vehicle);
      } catch(err) {
        errors.push({ ...vehicle, error: err.message || 'Unexpected error' });
      }
    }));

    if(errors.length > 0) {
      throw new Error(JSON.stringify({ code: 400, message: 'Partial data invalid', details: errors }));
    }
  }
}
