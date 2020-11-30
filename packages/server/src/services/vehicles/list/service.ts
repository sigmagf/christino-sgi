import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesListRequestDTO } from './dto';

export class VehiclesListService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesListRequestDTO) {
    const clients = await this.repository.list(data.page, data.limit, data.filters);

    if(clients.data.length <= 0) {
      throw new Error('No clients founded.');
    }

    return clients;
  }
}
