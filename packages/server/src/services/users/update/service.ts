import { IUser } from '~/entities/IUser';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersUpdateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Omit<IUser, 'createdAt'|'updatedAt'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'User not found.' }));
    }

    const user = await this.repository.update(data.id, data);
    user.emailChangeExpires = undefined;
    user.emailChangeToken = undefined;
    user.pwdResetExpires = undefined;
    user.pwdResetToken = undefined;
    user.password = undefined;
    return user;
  }
}
