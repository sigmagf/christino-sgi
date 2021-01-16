import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesDeleteRequestDTO } from './dto';

export class VehiclesDeleteService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesDeleteRequestDTO): Promise<void> {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Vehicle not founded');
    }

    await this.repository.delete(data.id);
  }
}
