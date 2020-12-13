import { IUsersRepository } from '~/repositories/IUsersRepository';
import { withPagination } from '~/utils/withPagination';

import { IUsersListRequestDTO } from './dto';

export class UsersListService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersListRequestDTO) {
    const users = await this.repository.list(data.filters);

    if(users.length <= 0) {
      throw new Error('No users founded.');
    }

    return withPagination(users, data.page, data.limit);
  }
}
