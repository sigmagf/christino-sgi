import { Vehicle } from '~/entities/Vehicle';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertStatus } from '~/utils/convertStatus';

import { IVehiclesUpdateRequestDTO } from './dto';

export class VehiclesUpdateService {
  constructor(
    private vehiclesRepo: IVehiclesRepository,
    private clientsRepo: IClientsRepository,
  ) { }

  async execute(data: IVehiclesUpdateRequestDTO): Promise<Vehicle> {
    console.log(data);

    const client = await this.clientsRepo.create({
      name: data.name,
      document: data.document,
      group: data.group,
    });

    const vehicle = await this.vehiclesRepo.update(data.id, {
      client_id: client.id || null,
      plate: data.plate,
      renavam: data.renavam,
      crv: data.crv,
      brand_model: data.brand_model,
      type: data.type,
      details: data.details || null,
      status: convertStatus(data.status),
    });

    return vehicle;
  }
}
