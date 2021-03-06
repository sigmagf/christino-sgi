import { IClient } from '@christino-sgi/common';

import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersFindService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    const user = await this.repository.findById(data.id);
    return user;
  }
}
