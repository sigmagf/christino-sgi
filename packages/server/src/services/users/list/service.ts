import { User } from '~/entities/User';
import { IPagination } from '~/interface';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersListRequestDTO } from './dto';

export class UsersListService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersListRequestDTO): Promise<IPagination<User>> {
    const users = await this.repository.list(data.page, data.limit);

    return users;
  }
}
