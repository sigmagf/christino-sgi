import { Request, Response } from 'express';

import { stringFix } from '~/utils/stringFix';

import { UsersAuthService } from './service';

export class UsersAuthController {
  constructor(private service: UsersAuthService) { }

  async handle(req: Request, res: Response) {
    const email = stringFix(req.body.email, undefined, 'LOWERCASE');
    const password = stringFix(req.body.password, undefined);

    try {
      if(!email) {
        return res.status(400).json({ code: 400, message: 'O item \'email\' é nulo ou indefinido.', details: null });
      }

      if(!password) {
        return res.status(400).json({ code: 400, message: 'O item \'password\' é nulo ou indefinido.', details: null });
      }

      const userWithToken = await this.service.execute({ email, password });
      return res.status(201).json(userWithToken);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
