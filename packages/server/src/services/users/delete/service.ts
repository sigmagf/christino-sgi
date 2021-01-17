import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersDeleteRequestDTO } from './dto';

export class UsersDeleteService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersDeleteRequestDTO): Promise<void> {
    if(!await this.repository.findById(data.id)) {
      throw new Error('User not founded');
    }

    await this.repository.delete(data.id);
  }
}
