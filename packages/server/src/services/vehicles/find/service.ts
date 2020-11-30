import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesFindRequestDTO } from './dto';

export class VehiclesFindService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesFindRequestDTO) {
    const client = await this.repository.find(data.id, undefined);

    if(!client) {
      throw new Error('No client founded.');
    }

    return client;
  }
}
