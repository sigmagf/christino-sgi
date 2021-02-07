import { IWorksRepository } from '~/repositories/IWorksRepository';

import { IWorksListRequestDTO } from './dto';

export class WorksListService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: IWorksListRequestDTO) {
    const works = await this.repository.list(data.page, data.limit, data.filters);
    return works;
  }
}
