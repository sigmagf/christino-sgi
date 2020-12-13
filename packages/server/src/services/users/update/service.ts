import bcrypt from 'bcryptjs';

import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersUpdateRequestDTO } from './dto';

export class UsersUpdateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersUpdateRequestDTO) {
    if(!await this.repository.find(data.id)) {
      throw new Error('No user founded.');
    }

    let hash: string;

    if(data.user.password) {
      hash = await bcrypt.hash(data.user.password, 10);
    }

    const user = await this.repository.update(data.id, {
      ...data.user,
      password: hash,
    });

    const userWithoutPassword: typeof user = { ...user, password: undefined };
    return userWithoutPassword;
  }
}
