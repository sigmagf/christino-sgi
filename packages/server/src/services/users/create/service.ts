import { User } from '~/entities/User';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersCreateRequestDTO } from './dto';

export class UsersCreateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersCreateRequestDTO): Promise<User> {
    if(await this.repository.findByEmail(data.email)) {
      throw new Error('User already exists');
    }

    const user = await this.repository.create(data);
    user.email_change_expires = undefined;
    user.email_change_token = undefined;
    user.pwd_reset_expires = undefined;
    user.pwd_reset_token = undefined;
    user.password = undefined;

    return user;
  }
}
