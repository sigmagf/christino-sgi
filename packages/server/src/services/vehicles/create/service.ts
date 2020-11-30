import { Client } from '~/entities/Client';
import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsCreateRequestDTO } from './dto';

export class ClientCreateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsCreateRequestDTO) {
    if(await this.repository.find(undefined, data.document)) {
      throw new Error('Client already exists.');
    }

    const client = await this.repository.save(new Client(data));

    return client;
  }
}
