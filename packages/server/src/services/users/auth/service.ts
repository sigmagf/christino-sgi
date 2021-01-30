import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUsersRepository } from '~/repositories/IUsersRepository';

import { IUsersAuthRequestDTO } from './dto';

export class UsersAuthService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IUsersAuthRequestDTO) {
    const user = await this.repository.findByEmail(data.email);

    if(!user) {
      throw new Error(JSON.stringify({ code: 404, message: 'User not found.' }));
    }

    if(!await bcrypt.compare(data.password, user.password)) {
      throw new Error(JSON.stringify({ code: 401, message: 'Invalid password.' }));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    user.email_change_expires = undefined;
    user.email_change_token = undefined;
    user.pwd_reset_expires = undefined;
    user.pwd_reset_token = undefined;
    user.password = undefined;
    return { user, token };
  }
}
