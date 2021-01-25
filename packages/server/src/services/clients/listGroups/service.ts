import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsListGroupsService {
  constructor(private repository: IClientsRepository) { }

  async execute(): Promise<string[]> {
    const groups = await this.repository.listGroups();

    return groups;
  }
}
