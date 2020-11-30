import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsListRequestDTO } from './dto';

export class ClientsListService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsListRequestDTO) {
    const clients = await this.repository.list(data.page, data.limit, data.filters);

    if(clients.data.length <= 0) {
      throw new Error('No clients founded.');
    }

    return clients;
  }
}
