import { Vehicle } from '~/entities/Vehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesFindRequestDTO } from './dto';

export class VehiclesFindService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesFindRequestDTO): Promise<Vehicle> {
    const vehicle = await this.repository.findById(data.id);

    return vehicle;
  }
}
