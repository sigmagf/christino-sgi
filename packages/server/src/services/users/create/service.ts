import { IUser } from '@christino-sgi/common';

import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersCreateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>) {
    if(await this.repository.findByEmail(data.email)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Usuário ja existe.', details: null }));
    }

    const user = await this.repository.create(data);
    return user;
  }
}
