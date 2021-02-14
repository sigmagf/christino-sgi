import { IClient } from '~/entities/IClient';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersFindService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    const user = await this.repository.findById(data.id);

    if(!user) {
      throw new Error(JSON.stringify({ code: 404, message: 'Usuário não encontrado.', details: null }));
    }

    return user;
  }
}
