import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersFindRequestDTO } from './dto';

export class UsersFindService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersFindRequestDTO) {
    const user = await this.repository.find(data.id);

    if(!user) {
      throw new Error('No user founded.');
    }

    return user;
  }
}
