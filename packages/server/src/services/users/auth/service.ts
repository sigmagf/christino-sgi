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

    function secondsUntilMidnight() {
      const midnight = new Date();
      midnight.setHours(24);
      midnight.setMinutes(0);
      midnight.setSeconds(0);
      midnight.setMilliseconds(0);
      return (midnight.getTime() - new Date().getTime()) / 1000;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: parseInt(secondsUntilMidnight().toString(), 10) });
    user.password = undefined;
    return { user, token };
  }
}
