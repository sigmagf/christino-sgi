import { IReceiptsRepository } from '~/repositories/IReceiptsRepository';

import { IReceiptsFindRequestDTO } from './dto';

export class ReceiptsFindService {
  constructor(private repository: IReceiptsRepository) { }

  async execute(data: IReceiptsFindRequestDTO) {
    const receipt = await this.repository.find(data.clientId, data.vehicleId);

    if(!receipt) {
      throw new Error('No receipt founded.');
    }

    return receipt;
  }
}
