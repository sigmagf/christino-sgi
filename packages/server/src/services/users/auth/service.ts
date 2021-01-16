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
      throw new Error('Usuario nao cadastrado!');
    }

    if(!await bcrypt.compare(data.password, user.password)) {
      throw new Error('Senha incorreta!');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    return { ...user, token };
  }
}
