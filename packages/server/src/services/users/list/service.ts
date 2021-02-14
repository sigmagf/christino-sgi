import { IUsersRepository } from '~/repositories/IUsersRepository';

interface IUsersListRequestDTO {
  page: number;
  limit: number;
}

export class UsersListService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersListRequestDTO) {
    const users = await this.repository.list(data.page, data.limit);
    return users;
  }
}
