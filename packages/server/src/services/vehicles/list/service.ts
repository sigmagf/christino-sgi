import { IVehiclesListFilters } from '~/interfaces';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

interface IVehiclesListRequestDTO {
  page: number;
  limit: number;
  filters: IVehiclesListFilters;
}

export class VehiclesListService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesListRequestDTO) {
    const vehicles = await this.repository.list(data.page, data.limit, data.filters);
    return vehicles;
  }
}
