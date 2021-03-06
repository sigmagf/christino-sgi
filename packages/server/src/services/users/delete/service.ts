import { IClient } from '@christino-sgi/common';

import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersDeleteService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Usuário não encontrado.', details: null }));
    }

    await this.repository.delete(data.id);
  }
}
