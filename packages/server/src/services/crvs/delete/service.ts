import { ICRVsRepositoryRepository } from '~/repositories/ICRVsRepository';

import { ICRVsDeleteRequestDTO } from './dto';

export class CRVsDeleteService {
  constructor(private repository: ICRVsRepositoryRepository) { }

  async execute(data: ICRVsDeleteRequestDTO) {
    await this.repository.delete(data.clientId, data.vehicleId);
  }
}
