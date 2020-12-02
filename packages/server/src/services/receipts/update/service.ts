import { IReceiptsRepository } from '~/repositories/IReceiptsRepository';

import { IReceiptsUpdateRequestDTO } from './dto';

export class ReceiptsUpdateService {
  constructor(private repository: IReceiptsRepository) { }

  async execute(data: IReceiptsUpdateRequestDTO) {
    if(!await this.repository.find(data.clientId, data.vehicleId)) {
      throw new Error('No vehicle founded.');
    }

    const receipt = await this.repository.update(data.clientId, data.vehicleId, data.receipt);

    return receipt;
  }
}
