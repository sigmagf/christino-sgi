import { IClient } from '~/entities/IClient';
import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsDeleteService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Cliente não encontrado.', details: null }));
    }

    await this.repository.delete(data.id);
  }
}
