import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsUpdateRequestDTO } from './dto';

export class ClientsUpdateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsUpdateRequestDTO) {
    if(!await this.repository.find(data.id, undefined)) {
      throw new Error('No client founded.');
    }

    const client = await this.repository.update(data.id, data);

    return client;
  }
}
