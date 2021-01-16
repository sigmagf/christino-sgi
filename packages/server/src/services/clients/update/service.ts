import { Client } from '~/entities/Client';
import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsUpdateRequestDTO } from './dto';

export class ClientsUpdateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsUpdateRequestDTO): Promise<Client> {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Client not founded');
    }

    const client = await this.repository.update(data.id, data);

    return client;
  }
}
