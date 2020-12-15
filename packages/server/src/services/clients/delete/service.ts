import { IClientsRepository } from '~/repositories/IClientsRepository';

import { IClientsDeleteRequestDTO } from './dto';

export class ClientsDeleteService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsDeleteRequestDTO) {
    await this.repository.delete(data.id);
  }
}
