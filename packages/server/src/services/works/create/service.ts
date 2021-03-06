import { IWork } from '@christino-sgi/common';

import { IWorksRepository } from '~/repositories/IWorksRepository';

interface IWorksCreateRequestDTO extends Pick<IWork, 'clientId'|'serviceId'|'identifier'|'value'|'status'|'details'> {
  history: string;
}

export class WorksCreateService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: IWorksCreateRequestDTO) {
    const work = await this.repository.create(data);
    return work;
  }
}
