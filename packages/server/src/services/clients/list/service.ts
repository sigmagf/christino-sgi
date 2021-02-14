import { IClientsListFilters } from '~/interfaces';
import { IClientsRepository } from '~/repositories/IClientsRepository';

interface IClientsListRequestDTO {
  page: number;
  limit: number;
  filters: IClientsListFilters;
}

export class ClientsListService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: IClientsListRequestDTO) {
    const clients = await this.repository.list(data.page, data.limit, data.filters);
    return clients;
  }
}
