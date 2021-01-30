import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsCreateRequestDTO } from './dto';

export class ClientsCreateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsCreateRequestDTO) {
    if(await this.repository.findByDocument(data.document)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Client already exists.' }));
    }

    const client = await this.repository.create(data);
    return client;
  }
}
