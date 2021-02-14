import { IClient } from '~/entities/IClient';
import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsFindService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    const client = await this.repository.findById(data.id);

    if(!client) {
      throw new Error(JSON.stringify({ code: 400, message: 'Cliente não encontrado.', details: null }));
    }

    return client;
  }
}
