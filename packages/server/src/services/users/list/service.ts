import { User } from '~/entities/User';
import { IPagination } from '~/interfaces';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersListRequestDTO } from './dto';

export class UsersListService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersListRequestDTO): Promise<IPagination<Pick<User, 'id'|'name'|'email'|'created_at'|'updated_at'>>> {
    const users = await this.repository.list(data.page, data.limit);

    const userWithOutPassword: IPagination<Pick<User, 'id'|'name'|'email'|'created_at'|'updated_at'>> = {
      page: users.page,
      data: users.data.map(({ id, name, email, created_at, updated_at }) => ({ id, name, email, created_at, updated_at })),
    };

    return userWithOutPassword;
  }
}
