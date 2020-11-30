import bcrypt from 'bcryptjs';

import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersUpdateRequestDTO } from './dto';

export class UsersUpdateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersUpdateRequestDTO) {
    if(!await this.repository.find(data.id, undefined)) {
      throw new Error('No user founded.');
    }

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
