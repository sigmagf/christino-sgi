import { Client } from '~/entities/Client';
import { IPagination } from '~/interfaces';
import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsListRequestDTO } from './dto';

export class ClientsListService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsListRequestDTO): Promise<IPagination<Client>> {
    const clients = await this.repository.list(data.page, data.limit);

    return clients;
  }
}
