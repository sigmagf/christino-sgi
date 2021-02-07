import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IWorksRepository } from '~/repositories/IWorksRepository';

import { IWorksCreateRequestDTO } from './dto';

export class WorksCreateService {
  constructor(private worksRepo: IWorksRepository, private clientsRepo: IClientsRepository) { }

  async execute(data: IWorksCreateRequestDTO) {
    const client = await this.clientsRepo.create({
      name: data.name,
      document: data.document,
      group: data.group,
    });

    const work = await this.worksRepo.create({ ...data, client_id: client.id });

    return work;
  }
}
