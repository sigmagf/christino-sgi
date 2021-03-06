import { IUser } from '@christino-sgi/common';

import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersUpdateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Omit<IUser, 'createdAt'|'updatedAt'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Usuário não encontrado.', details: null }));
    }

    const user = await this.repository.update(data.id, data);
    return user;
  }
}
