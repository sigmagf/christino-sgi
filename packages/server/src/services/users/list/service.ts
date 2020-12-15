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

    const usersWithoutPassword = users.map((u) => ({ ...u, password: undefined }));
    return data.noPagination ? usersWithoutPassword : withPagination(usersWithoutPassword, data.page, data.limit);
  }
}
