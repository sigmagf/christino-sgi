import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsListRequestDTO } from './dto';

export class ClientsListService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsListRequestDTO) {
    const clients = await this.repository.list(data.page, data.limit, data.filters);
    return clients;
  }
}
