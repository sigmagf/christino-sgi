import { IClient } from '@christino-sgi/common';

import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsCreateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Omit<IClient, 'id'|'createdAt'|'updatedAt'>) {
    if(await this.repository.findByDocument(data.document)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Cliente já cadastrado.', details: null }));
    }

    const dbData = await this.repository.create(data);
    return dbData;
  }
}
