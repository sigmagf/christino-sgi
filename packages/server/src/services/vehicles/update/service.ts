import { Client } from '~/entities/Client';
import { Vehicle } from '~/entities/Vehicle';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertDate } from '~/utils/convertDate';
import { convertStatus } from '~/utils/convertStatus';

import { IVehiclesUpdateRequestDTO } from './dto';

export class VehiclesUpdateService {
  constructor(
    private vehiclesRepo: IVehiclesRepository,
    private clientsRepo: IClientsRepository,
  ) { }

  async execute(data: IVehiclesUpdateRequestDTO): Promise<Vehicle> {
    let client: Client;

    if(!data.document) {
      client = await this.clientsRepo.create({
        name: data.name,
        document: data.document,
        folder: data.folder,
      });
    }

    const vehicle = await this.vehiclesRepo.update(data.id, {
      client_id: client.id || null,
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
