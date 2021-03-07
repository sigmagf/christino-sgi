import { IClient } from '@christino-sgi/common';

import { sendEmail } from '~/config/sendEmail';
import { IUsersRepository } from '~/repositories/IUsersRepository';

export class UsersResetPasswordService {
  constructor(private repository: IUsersRepository) { }

  async execute(data: Pick<IClient, 'id'>) {
    const dbUser = await this.repository.findById(data.id);

    if(!dbUser) {
      throw new Error(JSON.stringify({ code: 404, message: 'Usuário não encontrado.', details: null }));
    }

    await sendEmail({
      to: {
        name: dbUser.name,
        address: dbUser.email,
      },
      subject: 'Recuperação de senha | SGI',
      body: {
        text: `Olá ${dbUser.name} parece que você solicitou uma recuperação de senha, basta acessar o link abaixo e efetuar a recuperacao.\n\nhttps://sgi.christinoconsultoria.com.br/resetPassword?id=${dbUser.id}`,
        html: `Olá ${dbUser.name} parece que você solicitou uma recuperação de senha, basta acessar o link abaixo e efetuar a recuperacao.<br /><br /><a href="https://sgi.christinoconsultoria.com.br/resetPassword?id=${dbUser.id}">Clique aqui</a>`,
      },
    });
  }
}
