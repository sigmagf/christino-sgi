import { IClient } from '~/entities/IClient';
import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsFindService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    const client = await this.repository.findById(data.id);
    return client;
  }
}
