import { ICRVsRepository } from '~/repositories/ICRVsRepository';

import { ICRVsDeleteRequestDTO } from './dto';

export class CRVsDeleteService {
  constructor(private repository: ICRVsRepository) { }

  async execute(data: ICRVsDeleteRequestDTO) {
    await this.repository.delete(data.clientId, data.vehicleId);
  }
}
