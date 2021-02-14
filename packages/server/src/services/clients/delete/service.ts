import { IClient } from '~/entities/IClient';
import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsDeleteService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Cliente não encontrado.');
    }

    await this.repository.delete(data.id);
  }
}
