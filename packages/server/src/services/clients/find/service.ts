import { Client } from '~/entities/Client';
import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsFindRequestDTO } from './dto';

export class ClientsFindService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsFindRequestDTO): Promise<Client> {
    const client = await this.repository.findById(data.id);

    return client;
  }
}
