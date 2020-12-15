import { Crv } from '~/entities/CRV';
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
      let crvsFiltered: Crv[] = [];

      crvsFiltered = crvs.filter(({ vehicle: { plate, type } }) => {
        const plEnd = parseInt(plate.substr(6), 10);
        const isTruck = type === 'CAMINHAO' || type === 'C. TRATOR';

        switch(data.filters.licensingMonth) {
          case 4: return plEnd === 1 && !isTruck;
          case 5: return plEnd === 2 && !isTruck;
          case 6: return plEnd === 3 && !isTruck;
          case 7: return plEnd === 4 && !isTruck;
          case 8: return (plEnd === 5 || plEnd === 6) && !isTruck;
          case 9: return (plEnd === 7 && !isTruck) || ((plEnd === 1 || plEnd === 2) && isTruck);
          case 10: return (plEnd === 8 && !isTruck) || ((plEnd === 3 || plEnd === 4 || plEnd === 5) && isTruck);
          case 11: return (plEnd === 9 && !isTruck) || ((plEnd === 6 || plEnd === 7 || plEnd === 8) && isTruck);
          case 12: return plEnd === 0 || (plEnd === 9 && isTruck);
          default: return true;
        }
      });

      return data.noPagination === 'true' ? crvsFiltered : withPagination(crvsFiltered, data.page, data.limit);
    }

    return data.noPagination === 'true' ? crvs : withPagination(crvs, data.page, data.limit);
  }
}
