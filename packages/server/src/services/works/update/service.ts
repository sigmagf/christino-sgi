import { IWork } from '~/entities/IWork';
import { IWorksRepository } from '~/repositories/IWorksRepository';

interface IWorksUpdateRequestDTO extends Pick<IWork, 'id'|'clientId'|'serviceId'|'identifier'|'value'|'status'|'details'> {
  history: string;
}

export class WorksUpdateService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: IWorksUpdateRequestDTO) {
    const work = await this.repository.update(data.id, data);
    return work;
  }
}
