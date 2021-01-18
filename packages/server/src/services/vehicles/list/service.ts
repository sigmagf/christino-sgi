import { Vehicle } from '~/entities/Vehicle';
import { IPagination } from '~/interfaces';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesListRequestDTO } from './dto';

export class VehiclesListService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesListRequestDTO): Promise<IPagination<Vehicle>> {
    const vehicles = await this.repository.list(data.page, data.limit);

    return vehicles;
  }
}
