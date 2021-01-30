import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertStatus } from '~/utils/convertStatus';

import { IVehiclesUpdateRequestDTO } from './dto';

export class VehiclesUpdateService {
  constructor(private vehiclesRepo: IVehiclesRepository, private clientsRepo: IClientsRepository) { }

  async execute(data: IVehiclesUpdateRequestDTO) {
    const client = await this.clientsRepo.create({
      name: data.name,
      document: data.document,
      group: data.group,
    });

    if(!client) {
      JSON.stringify({ code: 404, message: 'Client not found.' });
    }

    if(!await this.vehiclesRepo.findById(data.id)) {
      JSON.stringify({ code: 404, message: 'Vehicle not found.' });
    }

    const vehicle = await this.vehiclesRepo.update(data.id, {
      client_id: client.id || null,
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
