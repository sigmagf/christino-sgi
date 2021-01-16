import { User } from '~/entities/User';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersUpdateRequestDTO } from './dto';

export class UsersUpdateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersUpdateRequestDTO): Promise<User> {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Usuario nao encontrado');
    }

    const user = await this.repository.update(data.id, data);

    return user;
  }
}
