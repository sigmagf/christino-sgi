import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsListGroupsService {
  constructor(private repository: IClientsRepository) { }

  async execute() {
    const groups = await this.repository.listGroups();
    return groups;
  }
}
