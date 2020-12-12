import { ICRVsRepository } from '~/repositories/ICRVsRepository';

import { ICRVsListRequestDTO } from './dto';

export class CRVsListService {
  constructor(private repository: ICRVsRepository) { }

  async execute(data: ICRVsListRequestDTO) {
    const crvs = await this.repository.list(data.page, data.limit, data.filters);

    if(crvs.data.length <= 0) {
      throw new Error('No crvs founded.');
    }

    return crvs;
  }
}
