import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUser } from '~/entities/IUser';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersAuthService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IUser, 'email'|'password'>) {
    const user = await this.repository.findByEmail(data.email, true);

    if(!user) {
      throw new Error(JSON.stringify({ code: 404, message: 'Usuário não encontrado.', details: null }));
    }

    if(!await bcrypt.compare(data.password, user.password)) {
      throw new Error(JSON.stringify({ code: 401, message: 'Senha inválida.', details: null }));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    user.password = undefined;
    return { user, token };
  }
}
