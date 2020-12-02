import { IReceiptsRepository } from '~/repositories/IReceiptsRepository';

import { IReceiptsListRequestDTO } from './dto';

export class ReceiptsListService {
  constructor(private repository: IReceiptsRepository) { }

  async execute(data: IReceiptsListRequestDTO) {
    const receipts = await this.repository.list(data.page, data.limit, data.filters);

    if(receipts.data.length <= 0) {
      throw new Error('No receipts founded.');
    }

    return receipts;
  }
}
