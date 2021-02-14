import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUser } from '~/entities/IUser';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersAuthService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IUser, 'email'|'password'>) {
    const user = await this.repository.findByEmail(data.email);

    if(!user) {
      throw new Error('Usuário não encontrado.');
    }

    if(!await bcrypt.compare(data.password, user.password)) {
      throw new Error('Senha inválida.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    user.emailChangeExpires = undefined;
    user.emailChangeToken = undefined;
    user.pwdResetExpires = undefined;
    user.pwdResetToken = undefined;
    user.password = undefined;

    return { user, token };
  }
}
