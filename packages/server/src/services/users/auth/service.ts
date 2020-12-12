import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersAuthRequestDTO } from './dto';

export class UsersAuthService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersAuthRequestDTO) {
    const user = await this.repository.findByEmail(data.email);

    console.log({
      email: data.email,
      password: data.password,
      user,
    });

    if(!user) {
      throw new Error('No user founded.');
    }

    if(!await bcrypt.compare(data.password, user.password)) {
      throw new Error('Invalid password.');
    }

    return {
      user,
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }),
    };
  }
}
