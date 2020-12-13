import { ICRVsRepository } from '~/repositories/ICRVsRepository';
import { withPagination } from '~/utils/withPagination';

import { ICRVsListRequestDTO } from './dto';

export class CRVsListService {
  constructor(private repository: ICRVsRepository) { }

  async execute(data: ICRVsListRequestDTO) {
    const crvs = await this.repository.list(data.filters);

    if(crvs.length <= 0) {
      throw new Error('No crvs founded.');
    }

    if(data.filters.licensingMonth) {
      if(data.filters.licensingMonth === 4) {
        const crvsFiltered = crvs.filter((crv) => {
          const plateEnd = parseInt(crv.vehicle.plate.substr(6), 10);

          if(plateEnd === 1 && crv.vehicle.type !== 'CAMINHAO' && crv.vehicle.type !== 'C. TRATOR') {
            return true;
          }

          return false;
        });

        return withPagination(crvsFiltered, data.page, data.limit);
      }
    }

    return withPagination(crvs, data.page, data.limit);
  }
}
