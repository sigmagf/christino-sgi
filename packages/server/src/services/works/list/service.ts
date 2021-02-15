import { IWorksListFilters } from '~/interfaces';
import { IWorksRepository } from '~/repositories/IWorksRepository';

interface IWorksListRequestDTO {
  page: number;
  limit: number;
  filters: IWorksListFilters;
}

export class WorksListService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: IWorksListRequestDTO) {
    const Works = await this.repository.list(data.page, data.limit, data.filters);
    return Works;
  }
}
