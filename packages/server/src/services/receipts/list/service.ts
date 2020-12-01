import { IReceiptsRepository } from '~/repositories/IReceiptsRepository';

import { IReceiptsListRequestDTO } from './dto';

export class ReceiptsListService {
  constructor(private repository: IReceiptsRepository) { }

  async execute(data: IReceiptsListRequestDTO) {
    const vehicles = await this.repository.list(data.page, data.limit, data.filters);

    if(vehicles.data.length <= 0) {
      throw new Error('No vehicles founded.');
    }

    return vehicles;
  }
}
