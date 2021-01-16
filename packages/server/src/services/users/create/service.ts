import { User } from '~/entities/User';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersCreateRequestDTO } from './dto';

export class UsersCreateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersCreateRequestDTO): Promise<User> {
    if(await this.repository.findByEmail(data.email)) {
      throw new Error('E-mail ja cadastrado!');
    }

    const user = await this.repository.create(data);

    return user;
  }
}
