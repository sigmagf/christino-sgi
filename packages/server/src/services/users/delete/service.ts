import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersDeleteRequestDTO } from './dto';

export class UsersDeleteService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersDeleteRequestDTO) {
    await this.repository.delete(data.id);
  }
}
