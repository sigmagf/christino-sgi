import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsFindRequestDTO } from './dto';

export class ClientsFindService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsFindRequestDTO) {
    const client = await this.repository.findById(data.id);

    if(!client) {
      throw new Error(JSON.stringify({ code: 404, message: 'Client not found.' }));
    }

    return client;
  }
}
