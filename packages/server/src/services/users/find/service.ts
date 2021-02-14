import { IClient } from '~/entities/IClient';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersFindService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    const user = await this.repository.findById(data.id);

    if(!user) {
      throw new Error('Usuário não encontrado.');
    }

    user.emailChangeExpires = undefined;
    user.emailChangeToken = undefined;
    user.pwdResetExpires = undefined;
    user.pwdResetToken = undefined;
    user.password = undefined;
    return user;
  }
}
