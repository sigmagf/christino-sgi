import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { withPagination } from '~/utils/withPagination';

import { IVehiclesListRequestDTO } from './dto';

export class VehiclesListService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesListRequestDTO) {
    const vehicles = await this.repository.list(data.filters);

    if(vehicles.length <= 0) {
      throw new Error('No vehicles founded.');
    }

    return withPagination(vehicles, data.page, data.limit);
  }
}
