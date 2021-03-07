import { IUser } from '@christino-sgi/common';

import { sendEmail } from '~/config/sendEmail';
import { IUsersRepository } from '~/repositories/IUsersRepository';

interface IDTO extends Pick<IUser, 'email'|'password'> {
  token: string;
}

export class UsersResetPasswordService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: IDTO) {
    const dbUser = await this.repository.findByEmail(data.email, true);

    if(!dbUser) {
      throw new Error(JSON.stringify({ code: 404, message: 'Usuário não encontrado.', details: null }));
    }

    if(data.token !== dbUser.pwdResetToken) {
      throw new Error(JSON.stringify({ code: 401, message: 'Token de recuperação inválido.', details: null }));
    }

    if(dbUser.pwdResetExpires < new Date()) {
      throw new Error(JSON.stringify({ code: 401, message: 'Token expirado.', details: null }));
    }

    await this.repository.update(dbUser.id, { password: data.password, pwdResetToken: null, pwdResetExpires: null });

    if(process.env.NODE_ENV !== 'development') {
      await sendEmail({
        to: [{
          name: dbUser.name,
          address: dbUser.email,
        }],
        subject: 'Senha recuperada!',
        body: { text: `Olá ${dbUser.name} sua senha foi redefinida com sucesso!` },
      });
    }
  }
}
