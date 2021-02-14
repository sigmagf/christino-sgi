import { IClient } from '~/entities/IClient';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersDeleteService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Usuário não encontrado.');
    }

    await this.repository.delete(data.id);
  }
}
