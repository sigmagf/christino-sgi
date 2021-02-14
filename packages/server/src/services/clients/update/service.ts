import { IClient } from '~/entities/IClient';
import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsUpdateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Pick<IClient, 'id'|'name'|'document'|'group'|'email'|'phone1'|'phone2'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Cliente não encontrado.');
    }

    if(await this.repository.findByDocument(data.document)) {
      throw new Error('Cliente já cadastrado.');
    }

    const client = await this.repository.update(data.id, data);
    return client;
  }
}
