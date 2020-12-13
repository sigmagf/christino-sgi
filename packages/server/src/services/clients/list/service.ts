import { IClientsRepository } from '~/repositories/IClientsRepository';
import { withPagination } from '~/utils/withPagination';

import { IClientsListRequestDTO } from './dto';

export class ClientsListService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsListRequestDTO) {
    const clients = await this.repository.list(data.filters);

    if(clients.length <= 0) {
      throw new Error('No clients founded.');
    }

    return withPagination(clients, data.page, data.limit);
  }
}
