import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsDeleteRequestDTO } from './dto';

export class ClientsDeleteService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsDeleteRequestDTO): Promise<void> {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Client not founded');
    }

    await this.repository.delete(data.id);
  }
}
