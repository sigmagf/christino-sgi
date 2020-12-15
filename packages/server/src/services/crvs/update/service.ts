import { ICRVsRepositoryRepository } from '~/repositories/ICRVsRepository';

import { ICRVsUpdateRequestDTO } from './dto';

export class CRVsUpdateService {
  constructor(private repository: ICRVsRepositoryRepository) { }

  async execute(data: ICRVsUpdateRequestDTO) {
    if(!await this.repository.find(data.clientId, data.vehicleId)) {
      throw new Error('No vehicle founded.');
    }

    const receipt = await this.repository.update(data.clientId, data.vehicleId, data.receipt);

    return receipt;
  }
}
