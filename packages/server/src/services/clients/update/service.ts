import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsUpdateRequestDTO } from './dto';

export class ClientsUpdateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsUpdateRequestDTO) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Client not found.' }));
    }

    const client = await this.repository.update(data.id, data);
    return client;
  }
}
