import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersAuthService } from './service';

export class UsersAuthController {
  constructor(private service: UsersAuthService) { }

  async handle(req: Request, res: Response) {
    const email = stringFix(req.body.email, undefined, 'LOWERCASE', 'STRING');
    const password = stringFix(req.body.password, undefined);

    try {
      if(!email) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'email\' é nulo ou indefinido.', details: null }));
      }

      if(!password) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'password\' é nulo ou indefinido.', details: null }));
      }

      const userWithToken = await this.service.execute({ email, password });
      return res.status(201).json(userWithToken);
    } catch(err) {
      return errorWork(res, err);
    }
  }
}
