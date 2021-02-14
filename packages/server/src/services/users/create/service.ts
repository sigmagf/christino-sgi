import { IUser } from '~/entities/IUser';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersCreateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>) {
    if(await this.repository.findByEmail(data.email)) {
      throw new Error('Usuário ja existe.');
    }

    const user = await this.repository.create(data);
    user.emailChangeExpires = undefined;
    user.emailChangeToken = undefined;
    user.pwdResetExpires = undefined;
    user.pwdResetToken = undefined;
    user.password = undefined;
    return user;
  }
}
