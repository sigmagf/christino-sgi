import { User } from '~/entities/User';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersUpdateRequestDTO } from './dto';

export class UsersUpdateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersUpdateRequestDTO): Promise<User> {
    if(!await this.repository.findById(data.id)) {
      throw new Error('User not founded');
    }

    const user = await this.repository.update(data.id, data);

    user.email_change_expires = undefined;
    user.email_change_token = undefined;
    user.pwd_reset_expires = undefined;
    user.pwd_reset_token = undefined;
    user.password = undefined;

    return user;
  }
}
