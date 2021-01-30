import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertStatus } from '~/utils/convertStatus';

import { IVehiclesCreateRequestDTO } from './dto';

export class VehiclesCreateService {
  constructor(private vehiclesRepo: IVehiclesRepository, private clientsRepo: IClientsRepository) { }

  async execute(data: IVehiclesCreateRequestDTO) {
    const client = await this.clientsRepo.create({
      name: data.name,
      document: data.document,
      group: data.group,
    });

    if(await this.vehiclesRepo.findByClientPlate(client.id, data.plate)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Vehicle already exists for this client.' }));
    }

    if(await this.vehiclesRepo.findByClientRenavam(client.id, data.renavam)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Vehicle already exists for this client.' }));
    }

    const vehicle = await this.vehiclesRepo.create({
      client_id: client.id,
      plate: data.plate,
      renavam: data.renavam,
      crv: data.crv || null,
      brand_model: data.brand_model,
      type: data.type,
      details: data.details || null,
      status: convertStatus(data.status),
    });

    return vehicle;
  }
}
