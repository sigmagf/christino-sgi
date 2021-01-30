import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersFindRequestDTO } from './dto';

export class UsersFindService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersFindRequestDTO) {
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
