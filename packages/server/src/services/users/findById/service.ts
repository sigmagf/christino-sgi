import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersFindByIdRequestDTO } from './dto';

export class UsersFindByIdService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersFindByIdRequestDTO) {
    const user = await this.repository.find(data.id, undefined);

    return user;
  }
}
