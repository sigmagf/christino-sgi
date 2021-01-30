import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesDeleteRequestDTO } from './dto';

export class VehiclesDeleteService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesDeleteRequestDTO) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Vehicle not found.' }));
    }

    await this.repository.delete(data.id);
  }
}
