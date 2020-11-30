import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesUpdateRequestDTO } from './dto';

export class VehiclesUpdateService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesUpdateRequestDTO) {
    if(!await this.repository.find(data.id, undefined, undefined)) {
      throw new Error('No vehicle founded.');
    }

    const client = await this.repository.update(data.id, data);

    return client;
  }
}
