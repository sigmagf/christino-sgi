import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesFindRequestDTO } from './dto';

export class VehiclesFindService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesFindRequestDTO) {
    const vehicle = await this.repository.findById(data.id);

    if(!vehicle) {
      throw new Error(JSON.stringify({ code: 404, message: 'Vehicle not found.' }));
    }

    return vehicle;
  }
}
