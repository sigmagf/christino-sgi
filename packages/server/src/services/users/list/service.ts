import { IUsersRepository } from '~/repositories/IUsersRepository';

interface IUsersListRequestDTO {
  page: number;
  limit: number;
}

export class UsersListService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersListRequestDTO) {
    const users = await this.repository.list(data.page, data.limit);

    const userWithOutPassword = {
      page: users.page,
      data: users.data.map(({ id, name, email, despPermission, seguPermission, cliePermission, userPermission, workPermission, createdAt, updatedAt }) => ({
        id,
        name,
        email,
        despPermission,
        seguPermission,
        cliePermission,
        userPermission,
        workPermission,
        createdAt,
        updatedAt,
      })),
    };

    return userWithOutPassword;
  }
}
