import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '~/entities/User';
import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersAuthRequestDTO } from './dto';

type UserWithToken = User & { token: string };

export class UsersAuthService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersAuthRequestDTO): Promise<UserWithToken> {
    const user = await this.repository.findByEmail(data.email);

    if(!user) {
      throw new Error('User not founded');
    }

    if(!await bcrypt.compare(data.password, user.password)) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    user.email_change_expires = undefined;
    user.email_change_token = undefined;
    user.pwd_reset_expires = undefined;
    user.pwd_reset_token = undefined;
    user.password = undefined;

    return { ...user, token };
  }
}
