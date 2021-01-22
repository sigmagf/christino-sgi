import { Vehicle } from '~/entities/Vehicle';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertDate } from '~/utils/convertDate';
import { convertStatus } from '~/utils/convertStatus';

import { IVehiclesCreateRequestDTO } from './dto';

export class VehiclesCreateService {
  constructor(
    private vehiclesRepo: IVehiclesRepository,
    private clientsRepo: IClientsRepository,
  ) { }

  async execute(data: IVehiclesCreateRequestDTO): Promise<Vehicle> {
    const client = await this.clientsRepo.create({
      name: data.name,
      document: data.document,
      group: data.group,
    });

    if(await this.vehiclesRepo.findByClientPlate(client.id, data.plate)) {
      throw new Error('Plate already exists for this client');
    }

    if(await this.vehiclesRepo.findByClientRenavam(client.id, data.renavam)) {
      throw new Error('Renavam already exists for this client');
    }

    const vehicle = await this.vehiclesRepo.create({
      client_id: client.id,
      plate: data.plate,
      renavam: data.renavam,
      crv: data.crv === '-' ? null : data.crv,
      brand_model: data.brand_model,
      type: data.type,
      details: data.details || null,
      issued_on: convertDate(data.issued_on),
      status: convertStatus(data.status.toLowerCase()),
    });

    return vehicle;
  }
}
