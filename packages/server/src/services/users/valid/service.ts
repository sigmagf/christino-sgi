import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersValidRequestDTO } from './dto';

export class UsersValidService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersValidRequestDTO) {
    const user = await this.repository.findById(data.id);

    if(!user) {
      throw new Error(JSON.stringify({ code: 404, message: 'User not found.' }));
    }

    user.email_change_expires = undefined;
    user.email_change_token = undefined;
    user.pwd_reset_expires = undefined;
    user.pwd_reset_token = undefined;
    user.password = undefined;
    return user;
  }
}
