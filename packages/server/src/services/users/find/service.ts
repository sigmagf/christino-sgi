import { User } from '~/entities/User';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersFindRequestDTO } from './dto';

export class UsersFindService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersFindRequestDTO): Promise<User> {
    const user = await this.repository.findById(data.id);

    return user;
  }
}
