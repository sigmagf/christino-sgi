import { IClientsRepository } from '~/repositories/IClientsRepository';

export class ClientsFindService {
  constructor(private repository: IClientsRepository) { }

  async execute(data: { param: string }) {
    if(data.param.length === 11 || data.param.length === 14) {
      const client = await this.repository.findByDocument(data.param);
      return client;
    }

    const client = await this.repository.findById(data.param);
    return client;
  }
}
