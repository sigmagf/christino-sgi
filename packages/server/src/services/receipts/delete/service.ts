import { IReceiptsRepository } from '~/repositories/IReceiptsRepository';

import { IReceiptsDeleteRequestDTO } from './dto';

export class ReceiptsDeleteService {
  constructor(private repository: IReceiptsRepository) { }

  async execute(data: IReceiptsDeleteRequestDTO) {
    await this.repository.delete(data.clientId, data.vehicleId);
  }
}
