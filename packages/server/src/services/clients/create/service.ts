import { IClient } from '~/entities/IClient';
import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsCreateService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: Omit<IClient, 'id'|'createdAt'|'updatedAt'>) {
    if(await this.repository.findByDocument(data.document)) {
      throw new Error('Cliente já cadastrado.');
    }

    const dbData = await this.repository.create(data);
    return dbData;
  }
}
