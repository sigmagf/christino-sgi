import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersListRequestDTO } from './dto';

export class UsersListService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersListRequestDTO) {
    const users = await this.repository.list(data.page, data.limit, data.filters);

    return users;
  }
}
