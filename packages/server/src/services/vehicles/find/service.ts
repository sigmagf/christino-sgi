import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesFindRequestDTO } from './dto';

export class VehiclesFindService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesFindRequestDTO) {
    const vehicle = await this.repository.find(data.id, undefined, undefined);

    if(!vehicle) {
      throw new Error('No vehicle founded.');
    }

    return vehicle;
  }
}
