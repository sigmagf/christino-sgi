import { Client } from '~/entities/Client';
import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsCreateRequestDTO } from './dto';

export class ClientsCreateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsCreateRequestDTO): Promise<Client> {
    if(await this.repository.findByDocument(data.document)) {
      throw new Error('Cliente ja cadastrado!');
    }

    const client = await this.repository.create(data);

    return client;
  }
}
