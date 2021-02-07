import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IWorksRepository } from '~/repositories/IWorksRepository';

import { IWorksUpdateRequestDTO } from './dto';

export class WorksUpdateService {
  constructor(private worksRepo: IWorksRepository, private clientsRepo: IClientsRepository) { }

  async execute(data: IWorksUpdateRequestDTO) {
    const client = await this.clientsRepo.create({
      name: data.name,
      document: data.document,
      group: data.group,
    });

    const work = await this.worksRepo.update(data.id, { ...data, client_id: client.id });
    return work;
  }
}
