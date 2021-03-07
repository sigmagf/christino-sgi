import { IUser } from '@christino-sgi/common';
import crypto from 'crypto';

import { sendEmail } from '~/config/sendEmail';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersForgotPasswordService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IUser, 'email'>) {
    const dbUser = await this.repository.findByEmail(data.email);

    if(!dbUser) {
      throw new Error(JSON.stringify({ code: 404, message: 'Usuário não encontrado.', details: null }));
    }

    const pwdResetToken = crypto.randomBytes(32).toString('hex');
    const pwdResetExpires = new Date();
    pwdResetExpires.setHours(pwdResetExpires.getHours() + 1);

    await this.repository.update(dbUser.id, { pwdResetToken, pwdResetExpires });

    if(process.env.NODE_ENV !== 'development') {
      await sendEmail({
        to: [{
          name: dbUser.name,
          address: dbUser.email,
        }],
        subject: 'Recuperação de senha.',
        body: {
          text: `
            Olá ${dbUser.name} parece que você solicitou uma recuperação de senha, basta acessar o link abaixo e efetuar a recuperacao.
            \n
            \n
            ${process.env.APP_URL}/resetPassword/${pwdResetToken}
          `,
          html: `
            Olá ${dbUser.name} parece que você solicitou uma recuperação de senha, basta acessar o link abaixo e efetuar a recuperacao.
            <br />
            <br />
            <a href="${process.env.APP_URL}/resetPassword/${pwdResetToken}">Clique aqui</a>`,
        },
      });
    }

    console.log({ pwdResetToken, pwdResetExpires });

    return { pwdResetToken, pwdResetExpires };
  }
}
