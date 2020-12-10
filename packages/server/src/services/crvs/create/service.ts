import { Crv } from '~/entities/CRV';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { ICRVsRepository } from '~/repositories/ICRVsRepositoryRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { ICRVsCreateRequestDTO } from './dto';

export class CRVsCreateService {
  constructor(
    private crvs: ICRVsRepository,
    private clients: IClientsRepository,
    private vehicles: IVehiclesRepository,
  ) { }

  async execute(data: ICRVsCreateRequestDTO) {
    const client = await this.clients.findOrCreate(data.client);
    const vehicle = await this.vehicles.findOrCreate(data.vehicle);

    if(!client || !vehicle) {
      throw new Error('Database error.');
    }

    if(await this.crvs.find(client.id, vehicle.id)) {
      throw new Error('Receipt already exists.');
    }

    const receipt = await this.crvs.save(new Crv({
      ...data,
      clientId: client.id,
      vehicleId: vehicle.id,
    }));

    return receipt;
  }
}
