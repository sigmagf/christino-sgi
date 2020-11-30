import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsFindRequestDTO } from './dto';

export class ClientsFindService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsFindRequestDTO) {
    const client = await this.repository.find(data.id, undefined);

    if(!client) {
      throw new Error('No client founded.');
    }

    return client;
  }
}
