import { IUser } from '@christino-sgi/common';

import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersFindService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IUser, 'id'>) {
    const user = await this.repository.findById(data.id);
    return user;
  }
}
