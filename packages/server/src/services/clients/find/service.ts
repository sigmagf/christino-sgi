import { IClient } from '~/entities/IClient';
import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsFindService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    if(data.id.length === 11 || data.id.length === 14) {
      const client = await this.repository.findByDocument(data.id);
      return client;
    }

    const client = await this.repository.findById(data.id);
    return client;
  }
}
