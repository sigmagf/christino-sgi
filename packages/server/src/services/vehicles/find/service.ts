import { IVehicle } from '@christino-sgi/common';

import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesFindService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: Pick<IVehicle, 'id'>) {
    const vehicle = await this.repository.findById(data.id);
    return vehicle;
  }
}
