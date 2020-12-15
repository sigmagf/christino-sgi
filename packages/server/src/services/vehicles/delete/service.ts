import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesDeleteRequestDTO } from './dto';

export class VehiclesDeleteService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesDeleteRequestDTO) {
    await this.repository.delete(data.id);
  }
}
