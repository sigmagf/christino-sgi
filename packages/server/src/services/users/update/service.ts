import bcrypt from 'bcryptjs';

import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersUpdateRequestDTO } from './dto';

export class UsersUpdateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersUpdateRequestDTO) {
    let hash: string;

    if(data.password) {
      hash = await bcrypt.hash(data.password, 10);
    }

    const user = await this.repository.update(data.id, {
      ...data,
      password: hash,
    });

    return user;
  }
}
