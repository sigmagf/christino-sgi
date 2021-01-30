import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsDeleteRequestDTO } from './dto';

export class ClientsDeleteService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsDeleteRequestDTO) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Client not found.' }));
    }

    await this.repository.delete(data.id);
  }
}
