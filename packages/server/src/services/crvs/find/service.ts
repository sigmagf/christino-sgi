import { ICRVsRepositoryRepository } from '~/repositories/ICRVsRepository';

import { ICRVsFindRequestDTO } from './dto';

export class CRVsFindService {
  constructor(private repository: ICRVsRepositoryRepository) { }

  async execute(data: ICRVsFindRequestDTO) {
    const receipt = await this.repository.find(data.clientId, data.vehicleId);

    if(!receipt) {
      throw new Error('No receipt founded.');
    }

    return receipt;
  }
}
