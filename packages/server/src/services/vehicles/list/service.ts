import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesListRequestDTO } from './dto';

export class VehiclesListService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesListRequestDTO) {
    const vehicles = await this.repository.list(data.page, data.limit, data.filters);
    return vehicles;
  }
}
