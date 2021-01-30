import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersDeleteRequestDTO } from './dto';

export class UsersDeleteService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersDeleteRequestDTO) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'User not found.' }));
    }

    await this.repository.delete(data.id);
  }
}
