import { Client } from '~/entities/Client';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertStatus } from '~/utils/convertStatus';

import { IVehiclesUpdateRequestDTO } from './dto';

export class VehiclesUpdateService {
  constructor(private vehiclesRepo: IVehiclesRepository, private clientsRepo: IClientsRepository) { }

  async execute(data: IVehiclesUpdateRequestDTO) {
    let client: Client;
    if(data.document) {
      client = await this.clientsRepo.create({
        name: data.name || undefined,
        document: data.document || undefined,
        group: data.group || undefined,
      });
    }

    if(!await this.vehiclesRepo.findById(data.id)) {
      JSON.stringify({ code: 404, message: 'Vehicle not found.' });
    }

    const vehicle = await this.vehiclesRepo.update(data.id, {
      client_id: client ? client.id : undefined,
      plate: data.plate || undefined,
      renavam: data.renavam || undefined,
      crv: data.crv || undefined,
      brand_model: data.brand_model || undefined,
      type: data.type,
      details: data.details || undefined,
      status: convertStatus(data.status),
      crlve_included: data.crlve_included || undefined,
    });

    return vehicle;
  }
}
