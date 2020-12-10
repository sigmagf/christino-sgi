import bcrypt from 'bcryptjs';

import { User } from '~/entities/User';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersCreateRequestDTO } from './dto';

export class UsersCreateService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersCreateRequestDTO) {
    if(await this.repository.findByEmail(data.email)) {
      throw new Error('User already exists.');
    }

    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.repository.save(new User({ ...data, password: hash }));

    return user;
  }
}
