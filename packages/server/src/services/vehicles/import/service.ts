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

    const vehicles = await Promise.all(
      data.map(async (vehicle) => {
        const client = await this.clientsRepo.findOrCreate({
          name: vehicle.name,
          document: vehicle.document,
          group: vehicle.group,
        });

        return {
          client_id: client.id,
          plate: vehicle.plate,
          renavam: vehicle.renavam,
          cla: vehicle.cla === '-' ? null : vehicle.cla,
          crv: vehicle.crv === '-' ? null : vehicle.crv,
          brand_model: vehicle.brand_model,
          type: vehicle.type,
          details: vehicle.details || null,
          issued_on: convertDate(vehicle.issued_on),
          status: convertStatus(vehicle.status.toLowerCase()),
        };
      }),
    );

    await Promise.all(vehicles.map(async (vehicle) => {
      if(await this.vehiclesRepo.findByClientPlate(vehicle.client_id, vehicle.plate)) {
        errors.push({
          ...vehicle,
          error: 'Placa ja cadastrada para este cliente!',
        });

        return;
      }

      if(await this.vehiclesRepo.findByClientRenavam(vehicle.client_id, vehicle.renavam)) {
        errors.push({
          ...vehicle,
          error: 'Renavam ja cadastrada para este cliente!',
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
